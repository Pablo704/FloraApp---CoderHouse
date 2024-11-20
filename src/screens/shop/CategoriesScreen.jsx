import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from 'react-native'
import Cards from '../../components/Cards.jsx'
import {  useDispatch } from 'react-redux'
import { setCategory } from '../../features/shop/shopSlice.js'
import { useGetCategoriesQuery } from '../../services/shop/shopService.js'



const CategoriesScreen = ({navigation}) => {
    const {width, height} = useWindowDimensions()

    const { data: categories, error, isLoading} = useGetCategoriesQuery()
    
    const dispatch = useDispatch()
    
    const renderCategoryItem = ({item, index}) =>{
        return(
        <Pressable onPress={()=>{
                dispatch(setCategory(item.title))
                navigation.navigate('Productos')
                }
            }>
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
        {  
            isLoading
            ?
            <ActivityIndicator size="large" color={"red"}/>
            :
            error
            ?
            <Text>Error al cargar las categorias</Text>
            :
            <FlatList style={styles.FlatList}
                data={categories}
                keyExtractor={item=>item.id}
                renderItem={renderCategoryItem}
            />
            
        }
    
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