import React from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './../styles';
// TODO: add flash button to app settings page
// TODO: verify that device actually has a front and back camera, else hide button
// TODO: work on web compatibility
export default ({ 
    // props from parent; set defaults
    capturing = false, 
    cameraType = CameraType.back, // Set to front/back camera
    flashMode = FlashMode.off, 
    setFlashMode, setCameraType, 
    showFlashToggle = false,
    navToGallery, 
    onCaptureIn, onCaptureOut, onLongCapture, onShortCapture,  
}) => (
    <Grid style={styles.bottomCamToolbar}>
        <Row>
            <Col style={styles.alignElemsCenter}>
                {showFlashToggle ?
                    <TouchableOpacity onPress={() => setFlashMode( 
                        flashMode === FlashMode.on ? FlashMode.off : FlashMode.on 
                    )}>
                        <Ionicons
                            name={flashMode == FlashMode.on ? "flash-outline" : 'flash-off-outline'}
                            color="white"
                            size={30}
                        />
                    </TouchableOpacity> : <TouchableOpacity onPress={navToGallery}>
                        <Ionicons
                                name={'images-outline'}
                                color="white"
                                size={36}
                            />
                </TouchableOpacity>}
            </Col>
            <Col size={2} style={styles.alignElemsCenter}>
                <TouchableWithoutFeedback 
                    onPressIn={onCaptureIn}
                    onPressOut={onCaptureOut}
                    onLongPress={onLongCapture}
                    onPress={onShortCapture}>
                    <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                        {capturing && <View style={styles.captureBtnInternal} />}
                    </View>
                </TouchableWithoutFeedback>
            </Col>
            <Col style={styles.alignElemsCenter}>
                <TouchableOpacity onPress={() => setCameraType(
                    cameraType === CameraType.back ? CameraType.front : CameraType.back
                )}>
                    <Ionicons
                        name="camera-reverse-outline"
                        color="white"
                        size={36}
                    />
                </TouchableOpacity>
            </Col>
        </Row>
    </Grid>
);