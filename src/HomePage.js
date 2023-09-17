import React, { useState } from 'react';
import { Button, View, Text, Switch } from 'react-native';

// navigation prop passed to every screen component in the native stack navigator
export default function HomeScreen({ navigation }) {
    const [catIsEnabled, setCatIsEnabled] = useState(false);
    const toggleSwitch = () => {
      setCatIsEnabled((previousState) => !previousState);
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Text>Home Screen</Text>
        <Button
          title="Crowd Scanner"
          onPress={() => {
              navigation.navigate('Crowd Scanner', { searchCategory: catIsEnabled ? 'Cartoon' : 'Human' })
              console.log("sending request: " + (catIsEnabled ? 'Cartoon' : 'Human'));
            }
          }
        />
        <Button
          title="App Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Switch
          trackColor={{ false: '#767577', true: '#1b8e2d' }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={catIsEnabled}
        />
        <Text>{catIsEnabled ? 'Look-a-like: Cartoons' : 'Look-a-like: Celebrities'}</Text>
      </View>
    );
  }