import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase.js";
const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    totalPrice: 0,
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
      const user = auth.currentUser;
      localStorage.setItem(
        `shoppingCart_${user.uid}`,
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      const { uid } = action.payload;
      const existingItem = state.items.find((item) => item.uid === uid);
      if (existingItem) {
        if (existingItem.count !== 1) existingItem.count -= 1;
      }
      const user = auth.currentUser;
      localStorage.setItem(
        `shoppingCart_${user.uid}`,
        JSON.stringify(state.items)
      );
    },

    deleteProductCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.uid !== action.payload.id
      );
      const user = auth.currentUser;
      let cart =
        JSON.parse(localStorage.getItem(`shoppingCart_${user.uid}`)) || [];
      let index = cart.findIndex(
        (cartItem) => cartItem.uid === action.payload.id
      );
      if (index !== -1) {
        cart.splice(index, 1);

        localStorage.setItem(`shoppingCart_${user.uid}`, JSON.stringify(cart));
      }
    },
    // getTotalPrice: (state) => {
    //   const totalPrice = state.items.reduce((accumulator, item) => {
    //     const itemPrice = item.price || 0;
    //     const itemDiscountPercentage = item.discountPercentage || 0;

    //     const discountedPrice = itemPrice * (1 - itemDiscountPercentage / 100);
    //     return accumulator + discountedPrice * item.count; // Multiply by item count
    //   }, 0);
    //   state.totalPrice = totalPrice; // Update the totalPrice in the state
    // },
  },
});
export const { addToCart, removeFromCart, getFromLocal, deleteProductCart } =
  cartSlice.actions;
export default cartSlice.reducer;
