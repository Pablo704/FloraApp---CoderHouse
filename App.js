import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { StatusBar } from 'expo-status-bar'

import {useEffect, useState} from 'react'
import TabNavigator from './src/navigation/TabNavigator';
import ShopNavigator from './src/navigation/ShopNavigator';

import { store } from './src/app/store';
import { Provider } from 'react-redux';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Roboto': require('./assets/Fonts/RobotoCondensed-Variable.ttf'),
    'Montserrat': require('./assets/Fonts/Montserrat-VariableFont_wght.ttf')
  });
  
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <Provider store={store}>
      <TabNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}


