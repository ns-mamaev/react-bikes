import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const bikesSlice = createSlice({
  name: 'bikes',
  initialState,
  reducers: {
    setBikes(state, { payload }) {
      state.list = payload;
    },
  },
});

export const { setBikes, setLoading } = bikesSlice.actions;

export default bikesSlice.reducer;
