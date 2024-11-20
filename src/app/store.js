import { configureStore } from '@reduxjs/toolkit';
import shopSlice from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';
import { shopApi } from '../services/shop/shopService';
import  authReducer from '../features/auth/authSlice';
import { receiptApi } from '../services/receipts/receiptsService';
import { authApi } from '../services/auth/authService';
import { userApi } from '../services/user/userService';

export const store = configureStore({
    reducer: { 
        shopSlice,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [receiptApi.reducerPath]: receiptApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(shopApi.middleware)
    .concat(receiptApi.middleware)
    .concat(authApi.middleware)
    .concat(userApi.middleware)
});