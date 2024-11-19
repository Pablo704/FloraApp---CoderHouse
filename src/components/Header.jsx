import { View, Text, Pressable, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors'

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.nav}>
        <Text style={styles.title}>
          <Icon name="local-florist" size={24} />
          FloraApp
        </Text> 

        <Pressable onPress={() => navigation.navigate('ShippingModal')}>
          <Text style={styles.title}>
            <Icon name="local-shipping" size={20} />
          </Text>
        </Pressable>
      </View>
      <Pressable style={styles.nav}>
        <Text style={styles.subTitle}>
          <Icon name="location-on" size={10} />
          Ubicación
        </Text>
      </Pressable>
    </View>
  );
};

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height:150,
        justifyContent: "center",
        alignItems:"start",
        backgroundColor:colors.header,
        borderRadius:12,
    },
    nav:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center"
    },
    title:{
        fontSize:25,
        color:colors.title,
        marginHorizontal:20,
        marginVertical:10,
        fontFamily:'Montserrat',
    },
    subTitle:{
        fontSize:15,
        color:colors.title,
        marginHorizontal:30,
        fontFamily:'Montserrat',
    },

})