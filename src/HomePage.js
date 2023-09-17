import React, { useState } from 'react';
import { Button, View, Text, Switch } from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';

// navigation prop passed to every screen component in the native stack navigator
export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Cartoon');
  const [scanModeEnabled, setScanModeEnabled] = useState(false);
  const toggleScanModeSwitch = () => {
    setScanModeEnabled((previousState) => !previousState);
  };
  // TODO: find out how to style buttons
    return (
      <View style={[styles.fullscreenFill, styles.alignElemsHorizCenter, {gap: 30, paddingTop: 30}]}>
        <Button
          title="Crowd Scanner"
          onPress={() => {
              navigation.navigate('Crowd Scanner', { searchCategory: selectedCategory, scanMode: scanModeEnabled ? 'Live' : 'Manual' })
              console.log("Chose Category: " + selectedCategory);
            }
          }
        />
        <Button
          title="App Details"
          onPress={() => navigation.navigate('Details')}
          style={styles.buttonStyle}
        />
          <Text style={[styles.bigText, { fontWeight: 'bold'}]}>Search Settings</Text>
          {/* <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', gap: 20}}> */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <Text style={styles.bigText}>{scanModeEnabled ? 'Scan Mode: Live Scanner' : 'Scan Mode: Manual Photo'}</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#f4511e' }}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleScanModeSwitch}
                value={scanModeEnabled}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap:0}}>
              <Text style={styles.bigText}>{'Look-a-like Category:'}</Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                style={styles.pickerStyle}
              >
                <Picker.Item label="Cartoon Characters" value="Cartoon" />
                <Picker.Item label="Celebrities" value="Human" />
                <Picker.Item label="Animals" value="Animal" />
              </Picker>
            </View>
          {/* </View> */}
      </View>
    );
  }