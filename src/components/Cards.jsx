import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors.js'

const Cards = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default Cards

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.background,
        shadowColor: colors.shadow,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {width: 3, height: 5},
        elevation:5,
        borderRadius:20,
        
    }
})