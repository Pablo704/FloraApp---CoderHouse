import { useState } from 'react'
import { Pressable, TextInput, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Search = ({ setSearchText }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (text) => {
    setSearchValue(text)
    setSearchText(text) 
  }
  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={() => setIsSearchVisible(!isSearchVisible)}>
        <Icon style={styles.iconSearch} name="search" size={30} />
      </Pressable>

      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar un producto"
          value={searchValue}
          onChangeText={handleSearchChange}
        />
      )}
    </View>
  )
}

export default Search;


const styles = StyleSheet.create({
    searchContainer:{
        flexDirection:'row-reverse',
        alignItems:'center',
        alignSelf:'center',
        width:'80%',
        padding:10,
    },
    searchInput:{
        flex:1,
        height:30,
        backgroundColor:'gray',
        color:'#fff',
        borderRadius:10,
        border:'none',
        padding:5,
    },
    iconSearch:{
        color:'#fff',
        margin: 10,
    }
})