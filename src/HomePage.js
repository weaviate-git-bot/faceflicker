import React, { useState } from 'react';
import { Button, View, Text, Switch } from 'react-native';

// navigation prop passed to every screen component in the native stack navigator
export default function HomeScreen({ navigation }) {
  const [catIsEnabled, setCatIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setCatIsEnabled((previousState) => !previousState);
  };
  const [scanModeEnabled, setScanModeEnabled] = useState(false);
  const toggleScanModeSwitch = () => {
    setScanModeEnabled((previousState) => !previousState);
  };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Button
          title="Crowd Scanner"
          onPress={() => {
              navigation.navigate('Crowd Scanner', { searchCategory: catIsEnabled ? 'Cartoon' : 'Human', scanMode: scanModeEnabled ? 'Live' : 'Manual' })
              console.log("Chose Category: " + (catIsEnabled ? 'Cartoon' : 'Human'));
            }
          }
        />
        <Button
          title="App Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Text>{catIsEnabled ? 'Look-a-like: Cartoons' : 'Look-a-like: Celebrities'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#1b8e2d' }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={catIsEnabled}
        />
        <Text>{scanModeEnabled ? 'Mode: Live Scanner' : 'Mode: Manual'}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#1b8e2d' }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleScanModeSwitch}
          value={scanModeEnabled}
        />
      </View>
    );
  }