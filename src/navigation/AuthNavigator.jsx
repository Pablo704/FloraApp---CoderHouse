import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/auths/LoginScreen"
import SignupScreen from "../screens/auths/SignupScreen"


const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login" component={LoginScreen}/>
            <AuthStack.Screen name="Signup" component={SignupScreen}/> 
        </AuthStack.Navigator>

    )
}

export default AuthNavigator