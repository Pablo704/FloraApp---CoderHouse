import { Button, StyleSheet, Text, TextInput, View, Pressable} from 'react-native'
import {colors} from '../global/colors.js'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Search from '../components/Search'

const Header = ({ setCategory, setSearch }) => {
  return (
    <>
    <View style={styles.headerContainer}>
      <View style={styles.nav}>
          <Pressable onPress={() => setCategory("")}>
            <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
          </Pressable>
          <Search style={styles.search} />
      </View>
          <Text style={styles.title}>
            <Icon name="local-florist" size={24}/>
            FloraApp
            <Icon name="local-florist" size={24}/>
          </Text>
    </View>
  </>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer:{
        height:200,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor:colors.header,
        borderRadius:20,
    },
    nav:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center"
    },
    title:{
        fontSize:30,
        color:colors.title,
        marginHorizontal:20,
        marginVertical:10,
        fontFamily:'Montserrat',
    },
    textInput: {
      borderWidth: 1,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderColor: '#fff',
      width: '90%',
      backgroundColor: '#ccc',
      marginHorizontal:10,
    },
    goBack: {
      padding:10,
      color:'#FAFBFC',
    },

})