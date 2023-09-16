import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styles from './../styles';

export default function ScrollGallery({captures=[], televal=0}) {
    const groupImagesIntoRows = (captures) => {
        const rows = [];
        for (let i = 0; i < captures.length; i += 3) {
          const row = captures.slice(i, i + 3);
          rows.push(row);
        }
        return rows;
    };
    const renderImageRows = () => {
        const rows = groupImagesIntoRows(captures);
        return rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map(({ uri }) => (
              <Image key={uri} source={{ uri }} style={styles.galleryImageMain} />
            ))}
          </View>
        ));
      };
    return (
    <ScrollView 
        horizontal={false}
        style={[styles.mainGalleryView, ]} 
    >
        {renderImageRows()}
    </ScrollView>
)};