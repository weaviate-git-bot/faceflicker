import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';

export default () => (
  <ScrollView style={styles.fullscreenFill}>
  <View style={[styles.alignElemsHorizCenter, {gap: 10, padding: 10}]}>
      <Text style={styles.midText}>FaceFlicker ©2023</Text>
      <Text style={styles.midText}>Founded by Edwin M. Hamilton</Text>
      <Text style={styles.midText}>Tarnished by J.R.G. West</Text>
      <Image
        source={require('./laneJumbotron.png')}
        style={styles.fullWideImg}
        resizeMode='contain'
      />
      <Text style={styles.midText}>In the wake of a magnificent storm in the year 2023, the glorious Lane Stadium jumbotron was struck by lightning and its pixels were left in hideous disarray. The live game highlights, replays, and most importantly, the between-play entertainment functions were all stripped from the stadium in an instant.</Text>
      <Text style={styles.midText}>It reminded many to appreciate the visual gaffs these stadiums usually provide, such as look-a-like cams. The inception of this very application came just half a fortnight after that fateful day. In an act epitomizing the idea of Ut Prosim, a visionary decided to bring these forms of visual entertainment not just back to stadiums, but to people everywhere, in their very own pockets. This app was designed to automate the look-a-like finding entertainment with AI and computer vision.</Text>

  </View>
  </ScrollView>
)