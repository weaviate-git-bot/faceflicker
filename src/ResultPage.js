import React from 'react';
import { Image, Button, View, Text } from 'react-native';
import styles from './styles';
import * as ImagePicker from 'expo-image-picker';

export default class ResultPage extends React.Component {

    render() {
        const { similarBase64: b64similar, ogPhotoData: b64og, name: similarName, distanceVal: dist } = this.props.route.params;
        var simSourceData = `data:image/jpg;base64,${b64similar}`;
        var ogSourceData = `data:image/jpg;base64,${b64og}`;
        // TODO: implement save result button
        return (
            <View style={[styles.fullscreenFill, styles.alignElemsHorizCenter, styles.resultPage]}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>{similarName}</Text>
                <Text style={{fontSize: 16, textAlign: 'center'}}>Distance: {dist}</Text>
                <Image source={{ uri: ogSourceData}} style={{width: 200, height: 200}}/>
                <Image source={{ uri: simSourceData }} style={{width: 200, height: 200}}/>
                <Button title="Save Result" />
            </View>
        )
    }
}