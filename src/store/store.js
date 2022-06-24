import { configureStore, createSlice } from "@reduxjs/toolkit";
import { formDataSlice } from "./formData-slice";
import { validitySlice } from "./validity-slice";
import { vehicleSlice } from "./vehicle-slice";
import { editBtnSlice } from "./edit-slice";
import { docSlice } from "./doc-slice";
import { pageSlice } from "./page-slice";
import { sizeSlice } from "./size-slice";

export const editBtnActions = editBtnSlice.actions;

const loadSlice = createSlice({
  name: "loading",
  initialState: { isLoading: false },
  reducers: {
    toggleLoad(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const loadingAction = loadSlice.actions;

export const store = configureStore({
  reducer: {
    formData: formDataSlice.reducer,
    validity: validitySlice.reducer,
    vehicles: vehicleSlice.reducer,
    editBtn: editBtnSlice.reducer,
    doc: docSlice.reducer,
    page: pageSlice.reducer,
    size: sizeSlice.reducer,
    load: loadSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
