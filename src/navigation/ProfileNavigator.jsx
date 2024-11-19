import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/ProfileScreen'
import Header from '../components/Header'

const ProfileStack = createNativeStackNavigator()

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen 
        name='Perfil' 
        component={ProfileScreen}
        options={({ navigation }) => ({
          header: () => <Header navigation={navigation} /> 
        })} 
      />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator

const styles = StyleSheet.create({})