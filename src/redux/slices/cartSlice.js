import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  removedBuffer: [],
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
      state.items.push({ ...item, qty: 1, cartId: createCartId(item), checked: true });
    },
    increaseItemQty(state, { payload: cartId }) {
      const match = findItemByCartId(state, cartId);
      if (match) {
        match.qty++;
      }
    },
    decreaseItemQty(state, { payload: cartId }) {
      const match = findItemByCartId(state, cartId);
      if (match && match.qty > 1) {
        match.qty--;
      }
    },
    toggleChecked(state, { payload: { cartId, isChecked } }) {
      const element = state.items.find((item) => item.cartId === cartId);
      if (element) {
        element.checked = isChecked;
      }
    },
    toggleAllChecked(state, { payload: isChecked }) {
      state.items.forEach((item) => (item.checked = isChecked));
    },
    deleteItem(state, { payload: cartId }) {
      state.items = state.items.filter((item) => item.cartId !== cartId);
    },
    addToRemovedBuffer(state, { payload: cartId }) {
      state.removedBuffer.push(state.items.find((item) => item.cartId === cartId));
    },
    deleteCheckedWithBuffer(state) {
      const { checked, unchecked } = state.items.reduce(
        (acc, item) => {
          if (item.checked) {
            acc.checked.push(item);
          } else {
            acc.unchecked.push(item);
          }
          return acc;
        },
        { checked: [], unchecked: [] },
      );
      state.items = unchecked;
      state.removedBuffer = [...state.removedBuffer, ...checked];
    },
    clearRemovedBuffer(state) {
      state.removedBuffer = [];
    },
    restoreRemoved(state) {
      state.items = [...state.removedBuffer, ...state.items];
      state.removedBuffer = [];
    },
  },
});

export const {
  addItem,
  increaseItemQty,
  decreaseItemQty,
  addToRemovedBuffer,
  clearRemovedBuffer,
  restoreRemoved,
  toggleChecked,
  toggleAllChecked,
  deleteItem,
  deleteCheckedWithBuffer,
} = cartSlice.actions;

export default cartSlice.reducer;
