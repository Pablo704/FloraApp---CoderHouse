import { Pressable, StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react'
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSignupMutation } from '../../services/auth/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validation/validtationSchema';

const textInputWidth = Dimensions.get('window').width*0.7

const SignupScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")

    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)

    const [triggerSignup, result ] = useSignupMutation()

    const dispatch = useDispatch()
    

    useEffect(()=>{
        if(result.status==="rejected"){
            console.log("Error al agregar el usuario", result)
            setErrorAddUser("Ups! No se pudo agregar el usuario")
        }else if(result.status==="fulfilled"){
            console.log("Cuenta Creada. Bienvenido")
            dispatch(setUser(result.data))
        }
    },[result])

    const onsubmit = ()=>{
        triggerSignup({ email, password})
        try {
            validationSchema.validateSync({ email, password, confirmPassword })
            setErrorEmail("")
            setErrorPassword("")
            setErrorConfirmPassword("")
            triggerSignup({ email, password })
        } catch (error) {
            switch (error.path) {
                case "email":
                    console.log(error.message)
                    setErrorEmail(error.message)
                    break
                case "password":
                    console.log(error.message)
                    setErrorPassword(error.message)
                    break
                case "confirmPassword":
                    console.log(error.message)
                    setErrorConfirmPassword(error.message)
                    break
                default:
                    setGenericValidationError(error.message)
                    break
            }
        }
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
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Email'
                    style={styles.textInput}
                />
                {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput 
                    onChangeText={(text) => setconfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir password'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{...styles.whiteText, ...styles.underLineText}}>Iniciar Sesión</Text>
                </Pressable>
            </View>

            <Pressable style={styles.buttonCreate} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            
            <View style={styles.optionContainer}>
                    <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch
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
        alignItems: 'center',
        

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
    error:{
        color: "red"
    }
})