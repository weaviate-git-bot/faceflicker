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
    // if(!this.searchCategory) {
    //     searchCategory = "Cartoon";
    // }
    state = {
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
    };
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
            this.props.navigation.navigate('Result', { similarBase64: jsonResponse['similar'], ogPhotoData: jsonResponse['original'], name: jsonResponse['text'], distanceVal: jsonResponse['distance'] });
            //this.props.navigation.navigate('Result', { similarBase64: imgBase64, ogPhotoData: imgBase64, name: "just testing bro", distanceVal: 0 });
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

    render() {
        const { cameraPermissionGranted, flashMode, cameraType, capturing, showFlashOption, captures } = this.state;

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
                <CameraToolBar 
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
                  />
            </React.Fragment>
        );
    };
};