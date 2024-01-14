import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    getFromLocal: (state, action) => {
      state.items = [];
      // state.items.push(...action.payload);
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);

      let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      cart.push(action.payload);
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.uid !== action.payload.id);

      let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
      let index = cart.findIndex(
        (cartItem) => cartItem.uid === action.payload.id
      );
      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
      }
    },
  },
});

export const { addToCart, removeFromCart, getFromLocal } = cartSlice.actions;
export default cartSlice.reducer;
