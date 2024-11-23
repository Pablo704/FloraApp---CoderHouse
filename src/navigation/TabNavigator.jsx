import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ProfileNavigator from "./ProfileNavigator";
import SentNavigator from "./SentNavigator";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";


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
      name="ShippingDetails"
      component={SentNavigator}
      options={{
        tabBarIcon: ({ focused }) => (
          <Icon name="local-shipping" size={30} color={focused ? "#ffffff" : "#9c9c9e"} />
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
);

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    backgroundColor: "#11493E",
  },
});
