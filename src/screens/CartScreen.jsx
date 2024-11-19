import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import { colors } from '../global/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../features/cart/cartSlice';



const CartScreen = () => {
  
  const cart = useSelector(state => state.cartReducer.value.cartItems)
  const total = useSelector(state => state.cartReducer.value.total)
  const dispatch = useDispatch();

  const FooterComponent = () =>(
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total}</Text>
      <Pressable style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>  
      </Pressable>  
    </View>
  )

  const renderCartItem = ({item})=>(
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
                    <Text style={styles.price}>Precio c/u: ${item.price}</Text>
                    <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                    <Pressable onPress={() => dispatch(removeItem(item.id))}>
                    <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon}/>
                  </Pressable>
                    
                </View>
            </Cards>
  )
  return (
    <FlatList 
      data={cart}
      keyExtractor={item => item.id}
      renderItem={renderCartItem}
      ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu Carrito: </Text>}
      ListFooterComponent={<FooterComponent />}
    />
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartScreenTitle:{
    fontSize:20,
    fontWeight:700,
    textAlign: "center",
    paddingVertical: 8,
  },
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
    fontSize: 12,
    marginHorizontal:10,
    color:'#ffffff'
},
price:{
    fontWeight: '800',
    fontSize: 12,
    color: '#D9D9D9',
    marginTop: 10,
},
quantity:{
  fontWeight: '800',
  fontSize: 12,
  color: '#D9D9D9'
},
total:{
  marginTop: 10,
  fontSize: 17,
  fontWeight: '800',
  color: '#D9D9D9'
},
trashIcon:{
  margin:12
},
agregar:{
  flexDirection: 'row',
  marginVertical: 5,
},
quantitys:{
  backgroundColor: "white",
  paddingHorizontal: 10,
},
suma:{
  backgroundColor: colors.button,
  paddingHorizontal: 10,
  color:"white"
},
resta:{
  backgroundColor: "#FC7A5E",
  paddingHorizontal: 10,
  color:"white"
},
footerContainer:{
  padding:32,
  gap:8,
  justifyContent:"center",
  alignItems:"center"
},
footerTotal:{
  fontSize: 16,
  fontWeight: '700'
},
confirmButton:{
  padding: 8,
  paddingHorizontal: 16,
  backgroundColor: colors.background,
  borderRadius: 16,
  marginBottom: 24,
},
confirmButtonText:{
  color: colors.title,
  fontSize: 16,
  fontWeight: '700',
},
})