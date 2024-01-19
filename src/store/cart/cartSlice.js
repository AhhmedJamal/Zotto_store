import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    getFromLocal: (state, action) => {
      state.items = [];
      state.items.push(...action.payload);
    },

    addToCart: (state, action) => {
      const { uid, img, price, rating, description } = action.payload;
      const existingItem = state.items.find((item) => item.uid === uid);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          uid,
          img,
          price,
          rating,
          description,
          count: 1,
        });
      }

      localStorage.setItem("shoppingCart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const { uid } = action.payload;

      const existingItem = state.items.find((item) => item.uid === uid);

      if (existingItem) {
        if (existingItem.count !== 1) existingItem.count -= 1;
      }

      localStorage.setItem("shoppingCart", JSON.stringify(state.items));
    },

    removeProductCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.uid !== action.payload.id
      );

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

export const { addToCart, removeFromCart, getFromLocal, removeProductCart } =
  cartSlice.actions;
export default cartSlice.reducer;
