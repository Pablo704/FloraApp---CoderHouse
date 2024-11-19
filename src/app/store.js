import { configureStore } from '@reduxjs/toolkit';
import shopSlice from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import { shopApi } from '../services/shopService';

export const store = configureStore({
    reducer: { 
        shopSlice,
        cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
});