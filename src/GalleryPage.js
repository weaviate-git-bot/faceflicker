import React from 'react';
import { Button, View, Text } from 'react-native';
import ScrollGallery from './components/scrollgallery';

export default class GalleryPage extends React.Component {
    render() {
        const savedCaptures = this.props.route.params.savedCaptures;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Saved Moments {savedCaptures.length} </Text>
                <ScrollGallery captures={savedCaptures} />
            </View>
        )
    }
}