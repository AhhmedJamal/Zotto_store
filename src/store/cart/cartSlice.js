import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    getFromLocal: (state, action) => {
      if (
        action.payload &&
        typeof action.payload[Symbol.iterator] === "function"
      ) {
        state.items = [];
        state.items.push(...action.payload);
      } else {
        console.error("Invalid payload received:", action.payload);
        // Optionally handle the case where payload is not iterable
      }
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
      const docRef = doc(db, "users", user.email);
      updateDoc(docRef, { cart: state.items });
    },

    removeFromCart: (state, action) => {
      const { uid } = action.payload;

      const existingItem = state.items.find((item) => item.uid === uid);

      if (existingItem) {
        if (existingItem.count !== 1) existingItem.count -= 1;
      }
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.email);
      updateDoc(docRef, { cart: state.items });
    },

    removeProductCart: async (state, action) => {
      state.items = state.items.filter(
        (item) => item.uid !== action.payload.id
      );
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.email);
      const docSnapshot = await getDoc(docRef);

      const userData = docSnapshot.data();
      let cart = userData.cart || [];
      let index = cart.findIndex(
        (cartItem) => cartItem.uid === action.payload.id
      );
      if (index !== -1) {
        cart.splice(index, 1);
        updateDoc(docRef, { cart: cart });
      }
    },
  },
});

export const { addToCart, removeFromCart, getFromLocal, removeProductCart } =
  cartSlice.actions;
export default cartSlice.reducer;
