import React from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from './../styles';

// Toolbar version for live scanner mode
export default ({ 
    // props from parent; set defaults
    cameraType = CameraType.back, // Set to front/back camera
    flashMode = FlashMode.off, 
    setCameraType,
}) => (
    <Grid style={styles.bottomCamToolbar}>
        <Row>
            <Col style={styles.alignElemsCenter}>
                <TouchableOpacity onPress={() => setCameraType(
                    cameraType === CameraType.back ? CameraType.front : CameraType.back
                )}>
                    <Ionicons
                        name="camera-reverse-outline"
                        color="white"
                        size={40}
                    />
                </TouchableOpacity>
            </Col>
        </Row>
    </Grid>
);