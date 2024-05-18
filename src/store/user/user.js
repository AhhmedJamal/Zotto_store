// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    email: "",
    photoURL: "",
    favorite: [],
    cart: [],
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.id = user.uid || "";
      state.name = user.displayName || "";
      state.email = user.email || "";
      state.photoURL = user.photoURL || "";
      state.favorite = user.favorite || [];
      state.cart = user.cart || [];

    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.photoURL = "";
      state.favorite = [];
      state.cart = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
