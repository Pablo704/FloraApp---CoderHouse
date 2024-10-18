import {useEffect, useState} from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import products from '../data/products.json'
import Cards from '../components/Cards'
import Search from '../components/Search';



const ProductsScreen = ({category}) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [search, setSearchText ] = useState("")

    useEffect(()=>{
        const productsTempFiltered = products.filter(products=>products.category.toLowerCase() === category.toLowerCase())
        setProductsFiltered(productsTempFiltered)
        if(search){
            const productsTempSearched = productsTempFiltered.filter(product=>
                product.title.toLowerCase().includes(search.toLowerCase()))
            setProductsFiltered(productsTempSearched)
        }
    },[category,search])

    const renderProductItem = ({item})=>{
        return(
            <Cards style={styles.productsContainer}>
                <View>
                    <Image
                        source={{uri:item.mainImage}}
                        style={styles.productsImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.productsDescription}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    {
                        item.discount > 0 && <View style={styles.discount}><Text style={styles.discountText}>Descuento {item.discount} %</Text></View>
                    }
                    {
                        item.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
                    }
                    <Text style={styles.price}>Precio: ${item.price}</Text>
                    <Text style={styles.tagText}>Tags : </Text>
                        {
                            <FlatList
                                style={styles.tags}
                                data={item.tags}
                                keyExtractor={() => Math.random()}
                                renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                            />}
                </View>
            </Cards>
        )
    }
  return (
    <>
    <FlatList
        data={productsFiltered}
        keyExtractor= {item=>item.id}
        renderItem={renderProductItem}

    />
    </>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productsContainer:{
        flexDirection:'row-reverse',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10,
        marginVertical:5,
        gap: 5,
        
    },
    productsImage:{
        width:200,
        height:200,
    },
    productsDescription:{
        alignItems:'center',
        width: '40%',
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 15,
        marginHorizontal:10,
        color:'#ffffff'
    },
    shortDescription:{
        
    },
    tags: {
        flexDirection: 'row-reverse',
        gap: 6
    },
    tagText: {
        fontWeight: '600',
        fontSize: 10,
        color: '#939393'
        
    },
    price:{
        fontWeight: '800',
        fontSize: 18,
        color: '#D9D9D9'
    },
    discount: {
        margin:10,
        backgroundColor: '#CBD7D5',
        padding: 8,
        borderRadius: 12,
        alignSelf: 'flex-start'
    },
    
})