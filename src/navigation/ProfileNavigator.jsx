import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/profile/ProfileScreen'
import Header from '../components/Header'
import LocationVisited from '../screens/locationVisited/LocationVisited'

const ProfileStack = createNativeStackNavigator()

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
    }}>
      <ProfileStack.Screen 
        name='Perfil' 
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} />,
        })} 
      />
      <ProfileStack.Screen 
       name="Mis lugares"
       component={LocationVisited}
       options={({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
      })} 
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})