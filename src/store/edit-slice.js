import { createSlice } from "@reduxjs/toolkit";
export const editBtnSlice = createSlice({
  name: "editBtn",
  initialState: { edit: false },
  reducers: {
    setEdit(state, action) {
      state.edit = action.payload;
    },
  },
});
