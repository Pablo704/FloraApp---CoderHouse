import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import Cards from '../components/Cards'
import Search from '../components/Search'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../services/shopService.js'
import { setProductId } from '../features/shop/shopSlice'

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([])
  const [search, setSearch] = useState("")

  const searchProductsTitle = (product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  const searchProductsTags = (product) =>
    product.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  const filterProducts = (product) => {
    return (
      searchProductsTitle(product) ||
      searchProductsTags(product)
    )
  }

  const category = useSelector(state => state.shopSlice.value.categorySelected)


  const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category)

  dispatch = useDispatch()

  useEffect(() => {
    setProductsFiltered(productsFilteredByCategory)
    if (search) {
        setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
    }
}, [search,productsFilteredByCategory])

  const renderProductItem = ({ item }) => {
    return (
      <Pressable onPress={() => {
        dispatch(setProductId(item.id))
        navigation.navigate('Detalle')
        }}>
        <Cards style={styles.productsContainer}>
          <View>
            <Image
              source={{ uri: item.mainImage }}
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
            <Text style={styles.tagText}>Tags: </Text>
            <FlatList
              style={styles.tags}
              data={item.tags}
              keyExtractor={(tag, index) => index.toString()}
              renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
            />
          </View>
        </Cards>
      </Pressable>
    )
  }

  return (
    <>
      { 
        isLoading
        ? 
        <ActivityIndicator size="large" color={"red"} />
        : 
        error
        ? 
        <Text>Error al cargar los productos</Text>
        : 
        <>
        <Search setSearch={setSearch} />
        : 
        <FlatList
            data={productsFiltered}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProductItem}/>
        </>
      }
    </>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    gap: 5,
  },
  productsImage: {
    width: 200,
    height: 200,
  },
  productsDescription: {
    alignItems: 'center',
    width: '40%',
  },
  productTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 15,
    marginHorizontal: 10,
    color: '#ffffff'
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
  price: {
    fontWeight: '800',
    fontSize: 18,
    color: '#D9D9D9'
  },
  discount: {
    margin: 10,
    backgroundColor: colors.backgroundDiscount,
    padding: 8,
    borderRadius: 12,
    alignSelf: 'flex-start'
  },
})
