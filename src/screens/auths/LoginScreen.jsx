import { Pressable, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useLoginMutation } from '../../services/auth/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const textInputWidth = Dimensions.get('window').width*0.7

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [triggerSignup, result ] = useLoginMutation()

    const dispatch = useDispatch()
    

    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al iniciar sesión", result)
        }else if(result.status==="fulfilled"){
            console.log("Usuario logueado con éxito. Bienvenido")
            dispatch(setUser(result.data))
        }
    },[result])

    const onsubmit = ()=>{
        triggerSignup({ email, password})
    }

    return (
        <LinearGradient
            colors={['#11493E', '#16A085']}
            start={{ x: 0, y: 0}}
            end={{ x: 2, y: 2}}
            style={styles.gradient}
        >
            <Text style={styles.title}>
                <Icon name="local-florist" size={24} />
                FloraApp
                <Icon name="local-florist" size={24} />
            </Text>
            <Text style={styles.subTitle}>Iniciar Sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Email'
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tiene una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={{...styles.whiteText, ...styles.underLineText}}>Crea una</Text>
                </Pressable>
            </View>

            <Pressable style={styles.buttonCreate} onPress={onsubmit}><Text style={styles.btnText}>Iniciar Sesión</Text></Pressable>
            
            <View style={styles.optionContainer}>
                    <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable
                  onPress={()=>dispatch
                    (setUser({email:"Userdemo@floraApp.com", token:"demo"}))}>
                    <Text style={{...styles.whiteText, ...styles.strongText}}>Ingresa como invitado</Text>
                </Pressable>
            </View>
        </LinearGradient>
      )
}

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },title: {
        color: colors.backgroundApp,
        fontSize: 40,
        fontWeight: '500',
    },
    subTitle: {
        fontSize: 18,
        fontFamily: "Montserrat",
        color: colors.backgroundDiscount,
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center'
    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: '#578e83',
        color: colors.titleAuth,
        width: textInputWidth,
        
    },
    footTextContainer: {
        flexDirection:"row",
        margin:10,
        gap: 8,
    },
    whiteText: {
        color: colors.titleAuth,
        fontSize: 16,
        marginBottom: 8,
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    buttonCreate: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.background,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.blanco,
        fontSize: 16,
        fontWeight: '700'
    },
    optionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },

})