import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CartScreen from '../screens/CartScreen'
import Header from '../components/Header'

const CartStack = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <CartStack.Navigator>
        <CartStack.Screen component={CartScreen} name='Carrito'
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} /> 
        })}
          />
    </CartStack.Navigator>
  )
}

export default CartNavigator

const styles = StyleSheet.create({})