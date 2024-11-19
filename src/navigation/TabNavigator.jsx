import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import ShopNavigator from "./ShopNavigator"
import CartNavigator from "./CartNavigator"
import ProfileNavigator from "./ProfileNavigator"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import SentScreen from "../screens/SentScreen"
import { colors } from "../global/colors"

const ShippingModal = ({ navigation }) => {
  return (

    <View style={styles.modalContainer}>
      <SentScreen />
        <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
        </Pressable>
    </View> 

  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Shop"
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
    }}
  >
    <Tab.Screen
      name="Shop"
      component={ShopNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="storefront" size={30} color={focused ? "#ffffff" : "#9c9c9e"} />
        ),
      }}
    />
    <Tab.Screen
      name="Cart"
      component={CartNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="shopping-cart" size={30} color={focused ? "#ffffff" : "#9c9c9e"} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="account-circle" size={30} color={focused ? "#ffffff" : "#9c9c9e"} />
        ),
      }}
    />
  </Tab.Navigator>
)

const RootStack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={TabNavigator} />
      <RootStack.Screen
        name="ShippingModal"
        component={ShippingModal}
        options={{
          presentation: 'modal',
        }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: '#11493E',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.backgroundApp,
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  closeButton: {
    margin:20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#11493E',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
