import React from 'react';
import { View, Text, Button } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import styles from './styles';
import CameraToolBar from './components/toolbar';
import GalleryPreview from './components/gallerypreview';
import * as FileSystem from 'expo-file-system';

export default class CameraPage extends React.Component {
    camera = null;
    searchCategory = this.props.route.params.searchCategory;
    // scanMode = this.props.route.params.scanMode;
    // TODO: set default vals if above are undefined
    state = {
        scanMode: this.props.route.params.scanMode,
        ranLiveScan: false,
        camReady: false, // currently not used, due to issues with finding proper use of onCameraReady callback
        captures: [],
        showFlashOption: false,
        flashMode: FlashMode.off,  // Flash off by default
        capturing: null,
        // start the back camera by default
        cameraType: CameraType.back,
        cameraPermissionGranted: null,
        api_url: "http://172.29.138.91:5000/search",
    };
    async componentDidMount() {
        await this.requestCameraPermissions();
        // /* Live Mode */
        if (this.state.scanMode === 'Live' && !this.state.ranLiveScan) {
            console.log("Starting live scan!!!");
            this.setState({ranLiveScan: true});
            setTimeout(this.liveCamPeriodic, 1000); // give one second for camera to get ready
        }
    };
    // // Never runs: TODO: figure out proper usage of onCameraReady
    // async onCameraReady() {
    //     console.log("CAMERA READY!!!");
    //     this.setState({camReady: true});
    //     /* Live Mode */
    //     if (this.state.scanMode === 'Live' && !this.state.ranLiveScan) {
    //         console.log("Starting live scan!!!");
    //         this.setState({ranLiveScan: true});
    //         this.liveCamPeriodic();
    //     }
    // };
        
    requestCameraPermissions = async () => {
        // Request camera permission
        const cam_perm_status = await Camera.requestCameraPermissionsAsync()
        const mic_perm_status = await Camera.requestMicrophonePermissionsAsync()

        const camPermissionGranted = (cam_perm_status.status === 'granted' && mic_perm_status.status === 'granted');
        // Track whether user has granted camera permission
        this.setState({ cameraPermissionGranted: camPermissionGranted });
    };

    saveImage = async (uri) => {
        try {
          // Request device storage access permission
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status === "granted") {
          // Save image to media library
            await MediaLibrary.saveToLibraryAsync(uri);
            console.log("Image successfully saved");
          }
        } catch (error) {
          console.log(error);
        }
      };
      
    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });

    handleCaptureIn = () => this.setState({ capturing: true });
    // try to stop recording if capturing is true
    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };
    // Take a photo and add returned data to captures array
    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
        this.saveImage(photoData.uri);
        try {
            const imgInfo = await FileSystem.getInfoAsync(photoData.uri, {size: true});
            console.log(imgInfo);
            const imgBase64 = await FileSystem.readAsStringAsync(photoData.uri, {encoding: FileSystem.EncodingType.Base64});
            const formData = new FormData();
            formData.append("base64FrameData", imgBase64);
            // TODO: create settings page to allow user to choose search type
            formData.append("category", this.searchCategory); // cartoon or Human
            // formData.append("mode", this.state.scanMode); // Live or Manual
            console.log("sending request: " + this.searchCategory);
            const response = await fetch(this.state.api_url, {
                method: "POST",
                mode: "no-cors",
                redirect: "follow",
                body: formData, 
            });
            console.log("response obtained");
            const jsonResponse = await response.json();
            console.log(Object.keys(jsonResponse));
            this.props.navigation.navigate('Result', { similarBase64: jsonResponse['similar'], ogPhotoData: jsonResponse['original'], name: jsonResponse['text'], distanceVal: jsonResponse['distance'], resultStatus: jsonResponse['status'] });
            //this.props.navigation.navigate('Result', { similarBase64: imgBase64, ogPhotoData: imgBase64, name: "just testing bro", distanceVal: 0, status: "success" });
          } catch (error) {
            console.error('Error during image processing', error);
            throw error;
          }
        
    };
    // Record a video and add returned data to captures array
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
        this.saveImage(videoData.uri);
    };
    exitToGallery = () => {
        this.props.navigation.navigate('Gallery', { savedCaptures: this.state.captures, });
    };
    
    /* Live scan mode */
    exitToResultsPage = (jsonResult) => {
        this.props.navigation.navigate('Result', { similarBase64: jsonResult['similar'], ogPhotoData: jsonResult['original'], name: jsonResult['text'], distanceVal: jsonResult['distance'], resultStatus: jsonResult['status'] });
    }
    // For live scan mode, periodically take photos to send to server, keep track of best result to display
    liveCamPeriodic = () => {
        let count = 0;
        let currMinDistance = 1.0;
        let bestJsonResponse = null;
        let localHandleShortCaptureLive = this.handleShortCaptureLive;
        let exitToResultsPage = this.exitToResultsPage;
        function iteration() {
          if (count < 10) {
            console.log(`Iteration ${count + 1}`);
            count++;
            localHandleShortCaptureLive().then((jsonResponse) => {
                // console.log(jsonResponse);
                if(jsonResponse !== null) {
                    // Compare min distance, keep smallest distance result
                    if(bestJsonResponse === null || currMinDistance > jsonResponse['distance']){
                        console.log("new min distance: " + jsonResponse['distance'] + " compared to old min distance: " + currMinDistance);
                        currMinDistance = jsonResponse['distance'];
                        bestJsonResponse = jsonResponse;
                    }
                }
                iteration();
                // TODO: if arbitrarily low distance is found, exit live mode and go to result page
            }).catch((error) => {
                console.error('Error in handleShortCaptureLive()', error);
                // iteration(); // try again anyway
            });
            // setTimeout(iteration, 1000); // Schedule the next iteration after 1 second (1000 milliseconds)
          } else {
            console.log("done scanning; " + count + " pictures");
            if(bestJsonResponse === null) {
                // Every single capture failed; retry scan with half the number of pictures
                count = 5
                iteration();
            }
            exitToResultsPage(bestJsonResponse);
          }
        }
        iteration(); // Start the first iteration
      }

    // Take a photo and add returned data to captures array
    handleShortCaptureLive = async () => {
        if(!this.state.capturing) { // && this.state.camReady
            const photoData = await this.camera.takePictureAsync();
            this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
            this.saveImage(photoData.uri);
            try {
                const imgInfo = await FileSystem.getInfoAsync(photoData.uri, {size: true});
                console.log(imgInfo);
                const imgBase64 = await FileSystem.readAsStringAsync(photoData.uri, {encoding: FileSystem.EncodingType.Base64});
                const formData = new FormData();
                formData.append("base64FrameData", imgBase64);
                // TODO: create settings page to allow user to choose search type
                formData.append("category", this.searchCategory); // cartoon or Human
                formData.append("mode", this.state.scanMode); // Live or Manual
                console.log("sending request: " + this.searchCategory);
                const response = await fetch(this.state.api_url, {
                    method: "POST",
                    mode: "no-cors",
                    redirect: "follow",
                    body: formData, 
                });
                console.log("response obtained");
                const jsonResponse = await response.json();
                console.log(Object.keys(jsonResponse));
                return jsonResponse;
            } catch (error) {
                console.error('Error during image processing', error);
                throw error;
            }
        } else {
            console.log("Camera not ready yet");
            return null;
        }
    };

    render() {
        const { cameraPermissionGranted, flashMode, cameraType, capturing, showFlashOption, captures, scanMode } = this.state;
        if (cameraPermissionGranted === null) {
            return <View />; // Indeterminate state while we are waiting for permission
        } else if (cameraPermissionGranted === false) {
            // TODO: redirect to different page, allow to ask for permissions again
            return (
            <View style={[styles.alignElemsHorizCenter, styles.permissionsDeniedView]}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>Camera access must be granted to use app.</Text>
                <Button title="Request Permissions Again" onPress={this.requestCameraPermissions} />
                <Text style={{fontSize: 16, textAlign: 'center'}}>If this doesn't work you will need to manually change the permissions in your phone's settings.</Text>
            </View>
            );
        }
        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.fullscreenFill}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <GalleryPreview captures={captures}/>}
                {(scanMode === 'Manual') && <CameraToolBar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    showFlashToggle={showFlashOption}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                    navToGallery={this.exitToGallery}
                  />}
            </React.Fragment>
        );
    }
}