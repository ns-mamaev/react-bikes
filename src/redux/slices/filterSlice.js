import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortTypeId: 0,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, { payload }) {
      state.categoryId = payload;
    },
    setSortType(state, { payload }) {
      state.sortTypeId = payload;
    },
  },
});

export const { setCategory, setSortType } = filterSlice.actions;

export default filterSlice.reducer;
