import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { StatusBar } from 'expo-status-bar'

import {useEffect, useState} from 'react'
import MainNavigator from './src/navigation/MainNavigator'

import { store } from './src/app/store';
import { Provider } from 'react-redux';

/* import { init } from './src/db'

init()
  .then((result)=>console.log("Tabla creada", result))
  .catch((error)=>console.log("Error al crear", error)) */

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
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}


