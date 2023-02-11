import { createSlice } from '@reduxjs/toolkit';
import { resolveArray } from '../../utills/utills';

const initialState = {
  items: [],
  totalQty: 0,
  totalCost: 0,
  removedBuffer: [],
  markedRemove: [],
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

const createCartId = (item) => {
  return item.id + Object.values(item.options).join('');
};

const findItemByCartId = (state, cartId) => state.items.find((item) => cartId === item.cartId);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, { payload: item }) {
      state.items.push({ ...item, qty: 1, cartId: createCartId(item) });
      updateTotals(state);
    },
    increaseItemQty(state, { payload: cartId }) {
      const match = findItemByCartId(state, cartId);
      if (match) {
        match.qty++;
        updateTotals(state);
      }
    },
    decreaseItemQty(state, { payload: cartId }) {
      const match = findItemByCartId(state, cartId);
      if (match && match.qty > 1) {
        match.qty--;
        updateTotals(state);
      }
    },
    replaceMarkedRemove(state, { payload: itemIDs }) {
      state.markedRemove = itemIDs;
    },
    markRemove(state, { payload }) {
      const cartIDs = resolveArray(payload);
      cartIDs.forEach((cartId) => {
        state.markedRemove.push(cartId);
      });
    },
    unmarkRemove(state, { payload }) {
      const cartIDs = resolveArray(payload);
      state.markedRemove = cartIDs.reduce((acc, cartId) => {
        return acc.filter((item) => item !== cartId);
      }, state.markedRemove);
    },
    addToRemovedBuffer(state, { payload }) {
      const items = resolveArray(payload);
      items.forEach((item) => {
        state.removedBuffer.push(item);
      });
      updateTotals(state);
    },
    clearRemovedBuffer(state) {
      state.removedBuffer = [];
    },
    restoreRemoved(state) {
      state.items = [...state.removedBuffer, ...state.items];
      state.removedBuffer = [];
      updateTotals(state);
    },
    deleteItems(state, { payload }) {
      const itemIDs = resolveArray(payload);
      state.items = itemIDs.reduce((acc, cartId) => {
        return acc.filter((item) => item.cartId !== cartId);
      }, state.items);
    },
  },
});

export const {
  addItem,
  increaseItemQty,
  decreaseItemQty,
  deleteItems,
  addToRemovedBuffer,
  clearRemovedBuffer,
  restoreRemoved,
  markRemove,
  unmarkRemove,
  replaceMarkedRemove,
} = cartSlice.actions;

export default cartSlice.reducer;
