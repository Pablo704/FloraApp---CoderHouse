import { createSlice } from "@reduxjs/toolkit";
import products from '../../data/products.json'

export const shopSlice = createSlice({
    name: 'shop',
    initialState:{
        value:{
            products,
            categorySelected: "",
            productsFilteredByCategory: [],
            productId: null
        }
    },
    reducers:{
        setCategory: (state, action) => {
            const category = action.payload.toLowerCase();
            state.value.productsFilteredByCategory = state.value.products.filter(
                product => product.category.toLowerCase() === category
            );
            state.value.categorySelected = action.payload
        },
        setProductId: (state, action) =>{
            state.value.productId = action.payload
        }
    }
})
export const {setCategory, setProductId} = shopSlice.actions

export default shopSlice.reducer