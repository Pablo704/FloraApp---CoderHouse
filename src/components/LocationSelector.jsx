import  { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, Modal, TouchableOpacity, Alert, Pressable } from "react-native";
import { colors } from "../global/colors";
import * as Location from "expo-location";

const LocationSelector = ({ visible, onClose, onLocationSelect }) => {
  const [manualLocation, setManualLocation] = useState("")

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se pudo acceder a la ubicación.")
        return
      }
  
      const location = await Location.getCurrentPositionAsync({})
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
  
      const address = await Location.reverseGeocodeAsync(coords);
      const formattedAddress = `${address[0].street}, ${address[0].city}, ${address[0].region}`
  
      onLocationSelect({ ...coords, address: formattedAddress })
    } catch (error) {
      console.error("Error obteniendo la ubicación:", error)
      Alert.alert("Error", "No se pudo obtener la ubicación.")
    }
  }
  
  
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona tu ubicación</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu ciudad o dirección"
            value={manualLocation}
            onChangeText={setManualLocation}
          />
          <Button title="Usar mi ubicación actual" onPress={getCurrentLocation} />
          <Pressable
            onPress={() => {
              if (manualLocation.trim()) {
                onLocationSelect({ address: manualLocation })
                onClose(); 
              } else {
                Alert.alert("Error", "Por favor ingresa una ubicación válida.")
              }
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Guardar ubicación</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.blanco,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: colors.button,
    padding: 10,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LocationSelector;
