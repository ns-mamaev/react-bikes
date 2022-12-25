import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortTypeId: 0,
  searchValue: '',
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
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
  },
});

export const { setCategory, setSortType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
