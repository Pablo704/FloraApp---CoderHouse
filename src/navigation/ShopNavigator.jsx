import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Header from "../components/Header"
import {CategoriesScreen, ProductsScreen, ProductScreen } from '../screens'

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
        <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#11493E',
              },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen 
            name="Categorías" 
            component={CategoriesScreen}
            options={({ navigation }) => ({
              header: () => <Header navigation={navigation} /> 
            })}
          />
          <Stack.Screen name="Productos" component={ProductsScreen} />
          <Stack.Screen name="Detalle" component={ProductScreen} />
        </Stack.Navigator>
  )
}

export default ShopNavigator
