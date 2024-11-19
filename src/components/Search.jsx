import { StyleSheet, Text, TextInput, View } from "react-native"

const Search = ({setSearch}) => {
  return (
    <TextInput
        style={styles.searchInput}
        placeholder="Buscar un producto"
        onChangeText={(text)=>setSearch(text)}
    />
  )
}

export default Search

const styles = StyleSheet.create({
    searchInput:{
        height: 50,
        margin:5,
        backgroundColor: '#efeded',
        color:'#000',
        borderRadius:10,
        border:'none',
        padding:5,
    }

})