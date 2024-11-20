import { StyleSheet, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CamaraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name='photo-camera' size={24} color="#fff"/>
    </View>
  )
}

export default CamaraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey',
        width:48,
        height:48,
        borderRadius:32
    }
})