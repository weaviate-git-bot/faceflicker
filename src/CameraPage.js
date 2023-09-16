import React from 'react';
import { View, Text, Button } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import styles from './styles';
import CameraToolBar from './components/toolbar';
import GalleryPreview from './components/gallerypreview';

export default class CameraPage extends React.Component {
    camera = null;
    state = {
        captures: [],
        showFlashOption: false,
        flashMode: FlashMode.off,  // Flash off by default
        capturing: null,
        // start the back camera by default
        cameraType: CameraType.back,
        cameraPermissionGranted: null,
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
    };
    // Record a video and add returned data to captures array
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
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