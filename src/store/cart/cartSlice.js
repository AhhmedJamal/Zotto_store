import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    removeAllCart: (state, action) => {
      state.items = [];
      localStorage.setItem(
        `shoppingCart_${action.payload}`,
        JSON.stringify(state.items)
      );
    },
    getFromLocal: (state, action) => {
      state.items = [];
      state.items.push(...action.payload);
    },

    addToCart: (state, action) => {
      console.log(action.payload);

      const { uid, img, price, rating, description } = action.payload.product;
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

      localStorage.setItem(
        `shoppingCart_${action.payload.id_user}`,
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.uid === action.payload.uid
      );
      if (existingItem) {
        if (existingItem.count !== 1) existingItem.count -= 1;
      }
      localStorage.setItem(
        `shoppingCart_${action.payload.id_user}`,
        JSON.stringify(state.items)
      );
    },

    deleteProductCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.uid !== action.payload.id
      );

      let cart =
        JSON.parse(
          localStorage.getItem(`shoppingCart_${action.payload.id_user}`)
        ) || [];
      let index = cart.findIndex(
        (cartItem) => cartItem.uid === action.payload.id
      );
      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem(
          `shoppingCart_${action.payload.id_user}`,
          JSON.stringify(cart)
        );
      }
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  getFromLocal,
  deleteProductCart,
  removeAllCart,
} = cartSlice.actions;
export default cartSlice.reducer;
