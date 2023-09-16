import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styles from './../styles';

export default function ScrollGallery({captures=[], televal=0}) {
    return (
    <ScrollView 
        horizontal={true}
        style={[styles.bottomCamToolbar, styles.galleryContainer]} 
    >
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                <Image source={{ uri }} style={styles.galleryImage} />
            </View>
        ))}
    </ScrollView>
)};