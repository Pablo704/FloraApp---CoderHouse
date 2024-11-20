import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Header from '../components/Header'
import SentScreen from '../screens/sent/SentScreen'

const Stack = createNativeStackNavigator()

const SentNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen component={SentScreen} name='Detalles Envios'
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} /> 
        })}
          />
    </Stack.Navigator>
  )
}

export default SentNavigator

const styles = StyleSheet.create({})