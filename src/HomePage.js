import React from 'react';
import { Button, View, Text } from 'react-native';

// navigation prop passed to every screen component in the native stack navigator
export default function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text>Home Screen</Text>
        <Button
          title="App Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Crowd Scanner"
          onPress={() => navigation.navigate('Crowd Scanner')}
        />
        <Button
          title="Gallery"
          onPress={() => navigation.navigate('Gallery', { savedCaptures: [] })}
        />
      </View>
    );
  }