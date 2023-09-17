import React from 'react';
import { Image, Button, View, Text, ScrollView, Alert } from 'react-native';
import styles from './styles';
import * as MediaLibrary from "expo-media-library";
import ViewShot from 'react-native-view-shot';

export default function ResultPage({ route, navigation }) {
    // TODO: make adjustments for horitontal view
    const viewShotRef = React.useRef();
    const saveComparisonImage = async () => {
        // Capture the view as an image
        const uri = await viewShotRef.current.capture();
        try {
            // Request device storage access permission
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === "granted") {
            // Save image to media library
                await MediaLibrary.saveToLibraryAsync(uri);
                Alert.alert(
                    'Image Saved!',
                    'View your gallery to review image.',
                    [
                        {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed; alert closed'),
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    const { similarBase64: b64similar, ogPhotoData: b64og, name: similarName, distanceVal: dist } = route.params;
    var simSourceData = `data:image/jpg;base64,${b64similar}`;
    var ogSourceData = `data:image/jpg;base64,${b64og}`;
    // TODO: implement save result button
    return (
        <ScrollView style={styles.fullscreenFill}>
            <View style={[styles.alignElemsHorizCenter, styles.resultPage]}>
                <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>{similarName}</Text>
                    <Text style={{fontSize: 16, textAlign: 'center'}}>Distance: {dist}</Text>
                    <Image source={{ uri: ogSourceData}} style={styles.resultImage}/>
                    <Image source={{ uri: simSourceData }} style={styles.resultImage}/>
                </ViewShot>
            </View>
            <Button title="Save Result" onPress={saveComparisonImage}/>
        </ScrollView>
    )
}