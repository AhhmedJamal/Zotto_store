import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice.js";
import modelReducer from "./model/modelSlice.js";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    model: modelReducer,
  },
});

export default store;
