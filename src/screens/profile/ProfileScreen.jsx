import { Pressable, StyleSheet, Text, View, Image, Button } from 'react-native'
import { colors } from '../../global/colors'
import CamaraIcon from '../../components/CamaraIcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { setProfilePicture } from '../../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../../services/user/userService'

const ProfileScreen = ({ navigation }) => {
  const name = useSelector((state) => state.authReducer.value.name)
  const user = useSelector((state) => state.authReducer.value.email)
  const image = useSelector((state) => state.authReducer.value.profilePicture)
  const localId = useSelector((state) => state.authReducer.value.localId)

  const [putProfilePic, result] = usePutProfilePictureMutation()

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
  };

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
      <View>
      <Text>Bienvenido a tu perfil</Text>
      <Button
        title="Ir a Mis lugares"
        onPress={() => navigation.navigate('Mis lugares')}
      />
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
      fontSize: 16
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
  }
})