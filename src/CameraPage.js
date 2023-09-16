import React from 'react';
import { View, Text } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import styles from './styles';
import CameraToolBar from './components/toolbar';
import ScrollGallery from './components/scrollgallery';

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
        // Request camera permission
        const cam_perm_status = await Camera.requestCameraPermissionsAsync()
        const mic_perm_status = await Camera.requestMicrophonePermissionsAsync()

        const cameraPermissionGranted = (cam_perm_status.status === 'granted' && mic_perm_status.status === 'granted');
        // Track whether user has granted camera permission
        this.setState({ cameraPermissionGranted });
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
            return <Text>Camera access must be granted to use app.</Text>;
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
                {captures.length > 0 && <ScrollGallery captures={captures}/>}
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