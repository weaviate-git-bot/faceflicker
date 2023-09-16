import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styles from './../styles';

export default function GalleryPreview({captures=[]}) {
    return (
    <ScrollView 
        horizontal={true}
        style={[styles.bottomCamToolbar, styles.galleryPreviewContainer]} 
    >
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
)};