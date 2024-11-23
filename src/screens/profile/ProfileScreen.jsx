import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../../global/colors'
import CamaraIcon from '../../components/CamaraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture, setUser } from '../../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../../services/user/userService'

const ProfileScreen = ({ navigation }) => {
  const name = useSelector((state) => state.authReducer.value.name)
  const user = useSelector((state) => state.authReducer.value.email)
  const image = useSelector((state) => state.authReducer.value.profilePicture)
  const localId = useSelector((state) => state.authReducer.value.localId)

  const [putProfilePic] = usePutProfilePictureMutation()
  
  const dispatch = useDispatch();

  const verifyCamPerms = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted)return false
      return true
  }

  const pickImage = async () => {
    const permissionOk = await verifyCamPerms();
    if (permissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.5,
      });
      if (!result.canceled) {
        dispatch(
          setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
          putProfilePic({image:`data:image/jpeg;base64,${result.assets[0].base64}`, localId})
      }
    }
  }

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.profileImage}
          />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            { opacity: pressed ? 0.9 : 1 },
            styles.cameraIcon,
          ]}
        >
          <CamaraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user}</Text>
      <View style={styles.mainProfile}>
      <Text style={styles.title}>Bienvenido a tu perfil</Text>
      <Pressable
        onPress={() => 
          navigation.navigate('Mis lugares')}
          style={styles.buttonLocation}>
          <Text>Ir a Mis lugares</Text>
      </Pressable>
    </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileContainer:{
    padding: 32,
    justifyContent:'center',
    alignItems: 'center'
  },
  imageProfileContainer:{
    width: 128,
    height:128,
    borderRadius: 128,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems:'center'
  },
  textProfilePlaceHolder: {
    color: colors.blanco,
    fontSize: 48,
  },
  profileData: {
      paddingVertical: 16,
      fontSize: 16,
      color: colors.grisClaro
  },
  cameraIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
  },
  profileImage: {
      width: 128,
      height: 128,
      borderRadius: 128
  },
  mainProfile:{
    justifyContent:'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 30,
  },
  buttonLocation:{
    borderWidth:5,
    borderColor: 'red',
    backgroundColor: colors.button, //color arcane
    padding: 10,
  },
  logoutButton: {
    backgroundColor: '#FF6347', // Tomate
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#DC143C', // Crimson
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})