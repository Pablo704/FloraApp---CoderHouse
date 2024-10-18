import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';
import CategoriesScreen from './src/screens/CategoriesScreen';
import Header from './src/components/Header';
import ProductsScreen from './src/screens/ProductsScreen';
import {useEffect, useState} from 'react'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Roboto': require('./assets/Fonts/RobotoCondensed-Variable.ttf'),
    'Montserrat': require('./assets/Fonts/Montserrat-VariableFont_wght.ttf')
  });
  
  const [category, setCategory] = useState("")

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <>
    
      <Header setCategory={setCategory} />
      {
        category
        ?
        <ProductsScreen category={category}  />
        :
        <CategoriesScreen setCategory={setCategory} />
      }
      <StatusBar style="auto" />

    </>
  );
}

