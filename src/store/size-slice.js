import { createSlice } from "@reduxjs/toolkit";

export const sizeSlice = createSlice({
  name: "size",
  initialState: { currentSize: 0 },
  reducers: {
    incrementSize(state, action) {
      state.currentSize = state.currentSize + 1;
    },
    deecrementSize(state, action) {
      state.currentSize = state.currentSize - 1;
    },
    setPage(state, action) {
      state.currentSize = action.payload;
    },
  },
});

export const sizeSliceActions = sizeSlice.actions;
