// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    name: "",
    email: "",
    photoURL: "",
    favorites: [],
    orders: [],
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;

      state.id = user.id || "";
      state.name = user.name;
      state.email = user.email || "";
      state.photoURL = user.photoURL || "";
      state.favorites = user.favorites || [];
      state.orders = user.orders || [];
    },
    clearUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.photoURL = "";
      state.favorites = [];
      state.orders = [];
    },
  },
});

export const GetDataUser = (email) => async (dispatch) => {
  if (email) {
    try {
      const docRef = doc(db, "users", email);
      const docSnapshot = await getDoc(docRef);
      const userData = docSnapshot.data();
      if (userData) {
        dispatch(setUser(userData));
      } else {
        console.log("User data is undefined");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  } else {
    dispatch(clearUser());
    console.log("User is not authenticated");
  }
};
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
