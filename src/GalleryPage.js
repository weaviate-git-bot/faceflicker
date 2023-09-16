import React from 'react';
import { Button, View, Text } from 'react-native';
import ScrollGallery from './components/scrollgallery';
import styles from './styles';

export default class GalleryPage extends React.Component {
    render() {
        const savedCaptures = this.props.route.params.savedCaptures;
        return (
                <View style={[styles.alignElemsHorizCenter, styles.galPage]}>
                <Text style={{fontSize: 16}}>Saved Moments: {savedCaptures.length} </Text>
                <ScrollGallery captures={savedCaptures} />
            </View>
        )
    }
}