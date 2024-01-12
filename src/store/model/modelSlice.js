import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "model",

  initialState: {
    show: false,
    id: null,
  },
  reducers: {
    openModel: (state, action) => {
      state.show = action.payload.show;
      state.id = action.payload.id;
    },
    closeModel: (state, action) => {
      state.show = action.payload.show;
    },
  },
});

export const { openModel, closeModel } = cartSlice.actions;
export default cartSlice.reducer;
