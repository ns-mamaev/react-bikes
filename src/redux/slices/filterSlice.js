import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sortTypeId: 0,
  searchValue: '',
  currentPage: 1,
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
    setCurrentPage(state, { payload }) {
      state.currentPage = payload;
    },
    setFilters(state, { payload: { page, sortTypeId, searchValue, category } }) {
      console.log(sortTypeId);
      state.currentPage = Number(page);
      state.sortTypeId = sortTypeId;
      state.searchValue = searchValue;
      state.categoryId = Number(category);
    },
  },
});

export const { setCategory, setSortType, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
