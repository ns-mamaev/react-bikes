import { configureStore } from '@reduxjs/toolkit';
import FilterSlice from './slices/filterSlice';
import BikesSlice from './slices/bikesSlice';

export const store = configureStore({
  reducer: {
    filter: FilterSlice,
    bikes: BikesSlice,
  },
});
