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
    function floatToPercentage(floatValue, decimalPlaces=2) {
        // Check if the input is a valid number
        if (typeof floatValue !== 'number' || isNaN(floatValue)) {
            return floatValue; // return unchanged value for simplicity in this use case
        }
        // Convert the float to a percentage string
        const percentage = (floatValue * 100).toFixed(decimalPlaces); // Adjust decimal places as needed
        return percentage + '%';
    }
    const { similarBase64: b64similar, ogPhotoData: b64og, name: similarName, distanceVal: dist, resultStatus: resultStatus } = route.params;
    var simSourceData = `data:image/jpg;base64,${b64similar}`;
    var ogSourceData = `data:image/jpg;base64,${b64og}`;
    // TODO: implement save result button
    return (
        <ScrollView style={styles.fullscreenFill}>
            <View style={[(resultStatus === 'success' ? styles.alignElemsHorizCenter : styles.alignElemsCenter), styles.resultPage]}>
                {resultStatus === 'fail' ? 
                    <View><Text style={{fontSize: 20, textAlign: 'center', padding: 16}}>Sorry, no match was found.</Text>
                        <Button title="Try Again" onPress={() => navigation.navigate('Crowd Scanner')} />
                    </View> : 
                    <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
                        <Text style={{fontSize: 20, textAlign: 'center'}}>{similarName}</Text>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>Similarity: {floatToPercentage(dist, 1)}</Text>
                        <Image source={{ uri: ogSourceData}} style={styles.resultImage}/>
                        <Image source={{ uri: simSourceData }} style={styles.resultImage}/>
                    </ViewShot>
                }
            </View>
            {resultStatus === 'success' && <Button title="Save Result" onPress={saveComparisonImage}/>}
        </ScrollView>
    )
}