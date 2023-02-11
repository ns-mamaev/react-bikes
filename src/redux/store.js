import { configureStore } from '@reduxjs/toolkit';
import FilterSlice from './slices/filterSlice';
import BikesSlice from './slices/bikesSlice';
import CartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter: FilterSlice,
    bikes: BikesSlice,
    cart: CartSlice,
  },
});
