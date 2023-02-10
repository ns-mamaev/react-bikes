import { createSlice } from '@reduxjs/toolkit';
import hash from 'object-hash';

const initialState = {
  items: [],
  totalQty: 0,
  totalCost: 0,
};

const updateTotals = (state) => {
  const { totalQty, totalCost } = state.items.reduce(
    (total, { price, qty }) => {
      total.totalQty += qty;
      total.totalCost += qty * price;
      return total;
    },
    { totalQty: 0, totalCost: 0 },
  );

  state.totalQty = totalQty;
  state.totalCost = totalCost;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload }) {
      state.items.push({ ...payload, qty: 1, cartId: hash(payload) });
      updateTotals(state);
    },
    increaseItemQty(state, { payload }) {
      const match = state.items.find(({ cartId }) => cartId === payload);
      if (match) {
        match.qty++;
        updateTotals(state);
      }
    },
    decreaseItemQty(state, { payload }) {
      const match = state.items.find(({ cartId }) => cartId === payload);
      if (match && match.qty > 1) {
        match.qty--;
        updateTotals(state);
      }
    },
    deleteItems(state, { payload }) {
      console.log('dispatch');
      const items = Array.isArray(payload) ? payload : [payload];
      state.items = items.reduce((acc, cartId) => {
        return acc.filter((item) => item.cartId !== cartId);
      }, state.items);
    },
  },
});

export const { addItem, increaseItemQty, decreaseItemQty, deleteItems } = cartSlice.actions;

export default cartSlice.reducer;
