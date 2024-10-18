import { StyleSheet, Text, View, FlatList, Image, Pressable } from 'react-native'
import categories from '../data/categories.json'
import Cards from '../components/Cards.jsx'

const CategoriesScreen = ({setCategory}) => {
    
    const renderCategoryItem = ({item, index}) =>{
        return(
        <Pressable onPress={()=>setCategory(item.title)}>
            <Cards style={
                index%2==0
                ?{ ...styles.flatCards, ...styles.rowReverse}
                :{ ...styles.flatCards, ...styles.row}
            }>
                <Image
                    source={{uri:item.image}}
                    style={styles.image}
                    resizeMode='contein'
                />
                <Text style={styles.categoryTitle}>{item.title}</Text>
            </Cards>
        </Pressable>
        )
    }
    
  return (
    < >
      <FlatList style={styles.FlatList}
        data={categories}
        keyExtractor={item=>item.id}
        renderItem={renderCategoryItem}
      />
    </>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    flatCards:{
        justifyContent:"space-between",
        alignItems:"center",
        marginHorizontal:10,
        marginVertical:5,
        padding:20,

    },
    categoryTitle:{
        fontSize:24,
        fontWeight:"bold",
        paddingVertical: 10,
        alignItems: "center",
        color:"#ffffff"

    },
    image:{
        width: 150,
        height: 200,
        resizeMode:"cover"
    },
    row:{
        flexDirection: 'row'
    },
    rowReverse:{
        flexDirection:'row-reverse',
    }
})