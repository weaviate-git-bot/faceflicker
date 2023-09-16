import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsPage from './src/DetailsPage';
import HomeScreen from './src/HomePage';
import CameraPage from './src/CameraPage';
import GalleryPage from './src/GalleryPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsPage} />
        <Stack.Screen name="Crowd Scanner" component={CameraPage} />
        <Stack.Screen name="Gallery" component={GalleryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;