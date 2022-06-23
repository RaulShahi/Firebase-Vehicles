import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: { currentPage: 1 },
  reducers: {
    incrementPage(state, action) {
      state.currentPage = state.currentPage + 1;
    },
    decrementPage(state, action) {
      state.currentPage = state.currentPage - 1;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const pageSliceActions = pageSlice.actions;
