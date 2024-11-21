import { useState } from 'react'
import {StyleSheet, Text,View, TextInput, Pressable, FlatList,} from 'react-native'
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-toast-message'
import { colors } from '../../global/colors'
import Cards from '../../components/CardLocation'
import MapView, { Marker } from 'react-native-maps'

const LocationVisited = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  const [title, setTitle] = useState('')
  const [places, setPlaces] = useState([])

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      visibilityTime: 2000,
    })
  }

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return false
    }
    return true
  };

  const renderPlaceItem = ({ item }) => (
    <Cards style={styles.placeContainer}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item.coords.latitude,
            longitude: item.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.coords.latitude,
              longitude: item.coords.longitude,
            }}
            title={item.title}
          />
        </MapView>
      </View>
      <View style={styles.placeDescriptionContainer}>
        <Text style={styles.mapTitle}>{item.title}</Text>
        <Text style={styles.mapCoordinates}>
            Lat: {item.coords.latitude.toFixed(4)}, 
            Lng: {item.coords.longitude.toFixed(4)}
        </Text>
      </View>
    </Cards>
  )

  const getLocation = async () => {
    const permissionOk = await getPermissions();
    if (!permissionOk) {
      showToast('error', 'No se concedieron los permisos');
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      showToast('success', '¡Ubicación obtenida!');
    } catch (error) {
      showToast('error', 'No se pudo obtener la ubicación');
    }
  }

  const savePlace = () => {
    if (!location || !title.trim()) {
      showToast('error', 'Por favor ingresa un título y obtén tu ubicación primero.');
      return;
    }
    setPlaces((prevState) => [...prevState,
      {id: Math.random().toString(),
        title,
        coords: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
    ]);
    setTitle('');
    showToast('success', 'Lugar guardado exitosamente.')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis lugares:</Text>
      <View style={styles.inputContainer}>
        <Pressable onPress={getLocation}>
          <Icon name="location-on" color="#CA226B" size={24} />
        </Pressable>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre del Vivero"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable onPress={savePlace}>
          <Icon name="add-circle" color={colors.button} size={32} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>Tus Viveros favoritos:</Text>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlaceItem}
      />
      <Toast />
    </View>
  )
}
export default LocationVisited

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center", 
      padding: 10
    },
    title: {
      fontSize: 18,
    },
    subtitle: {
      fontSize: 12,
      color: 'gray'
    },
    inputContainer: {
      paddingVertical: 16,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    textInput: {
      borderWidth: 2,
      borderColor: '#B0E0E6',
      borderRadius: 20,
      padding: 8,
      width: '80%',
      paddingLeft: 16,
    },
    placeContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 16,
      margin: 10,
      gap: 24
    },
    mapContainer: {
      width: 120,
      height: 120,
      borderRadius: 75,
      overflow: "hidden",
      elevation: 5,
    },
    map: {
      width: 120,
      height: 120,
    },
    mapTitle: {
      fontWeight: '700'
    },
    mapCoordinates: {
      flexDirection: 'column',
      fontSize: 12,
      color: '#555',
      marginTop: 4,
    },
    placeDescriptionContainer: {
      width: '60%',
      padding: 8
    }
})
  