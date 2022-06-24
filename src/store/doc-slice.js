import { createSlice } from "@reduxjs/toolkit";

export const docSlice = createSlice({
  name: "docs",
  initialState: { lastDoc: {}, firstDoc: {} },
  reducers: {
    getLastDoc(state, action) {
      state.lastDoc = action.payload;
    },
    getFirstDoc(state, action) {
      state.firstDoc = action.payload;
    },
  },
});

export const docActions = docSlice.actions;
