import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../global/colors'

const CardLocation = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default CardLocation

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.grisClaro,
        shadowColor: colors.negro,
        shadowOpacity:1,
        shadowRadius:1,
        shadowOffset: {width: 3,height:5},
        elevation:10,
    }
})