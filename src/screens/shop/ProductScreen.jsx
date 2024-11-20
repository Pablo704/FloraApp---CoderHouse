import { StyleSheet, Text, View, Image, useWindowDimensions, FlatList, Pressable, ScrollView, ActivityIndicator} from 'react-native'
import { useEffect, useState } from 'react'
import {colors} from '../../global/colors.js'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice.js'
import { useGetProductQuery } from '../../services/shop/shopService.js'

const ProductScreen = ({ route }) => {

  const productId = useSelector(state=>state.shopSlice.value.productId)

  const { width, height } = useWindowDimensions()

  const {data: productFound, error, isLoading} = useGetProductQuery(productId)

  const dispatch = useDispatch()

  return (
    <>
    {
        isLoading
        ?
        <ActivityIndicator size="large" color={"red"} />
        :
        error
        ?
        <Text>Error al cargar el producto</Text>
        :
        <>
        <Image
          source = {{uri: productFound.mainImage}}
          alt = {productFound.title} 
          width = {width} 
          height = {width*1}
      />
      <ScrollView style={styles.detailContainer} >
        <Text style={styles.textBrand} >{productFound.brand}</Text>
        <Text style={styles.textTitle} >{productFound.title}</Text>
      <View style={styles.discountPrice}>
          <Text style={styles.price}>${productFound.price}</Text>
        {productFound.discount > 0 && 
          <View style={styles.discount}>
            <Text style={styles.discountText}>Descuento: {productFound.discount}%</Text>
          </View>
        }
        </View>
        { 
          productFound.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
        }
        <Text style={styles.longDescription}>{productFound.longDescription}</Text>

        <Pressable 
          style={({ pressed }) => [{ backgroundColor: pressed ? colors.backgroundDiscount : 'white' }, styles.addToCartButton]}
          onPress={()=> dispatch(addItem({...productFound, quantity: 1}))}>
            <Text style={styles.addToMyCartText}>Agregar al carrito</Text>
        </Pressable>
      </ScrollView>
        </>
        
      }
      
      
    </>

  )
}

export default ProductScreen

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  textBrand: {
    color: '#3b8976',
  },
  textTitle: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 20,
    color: '#ffffff',
  },
  discountPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discount: {
    padding: 8,
    alignSelf: 'flex-end',
  },
  price: {
    width: '10%',
    margin: 10,
    fontWeight: '800',
    fontSize: 18,
    color: '#ffffff',
  },
  discountText: {
    backgroundColor:colors.backgroundDiscount,
    marginRight: 10,
    borderRadius: 12,
    padding: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  longDescription: {
    color: '#849691',
  },
  addToCartButton: {
    padding: 17,
    marginVertical: 10,
    marginBottom: 30,
    borderRadius: 12,
  },
  addToMyCartText:{
    fontSize: 15,    
    fontWeight:'bold',
    textAlign:'center'
  }
})
