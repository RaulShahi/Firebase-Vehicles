import { createSlice } from "@reduxjs/toolkit";

export const validitySlice = createSlice({
  name: "validity",
  initialState: {
    type: null,
    modelName: null,
    company: null,
    engine: null,
    mileage: null,
    image: null,
  },
  reducers: {
    type(state, action) {
      return {
        ...state,
        type: action.payload.val !== "",
      };
    },
    modelName(state, action) {
      return {
        ...state,
        modelName: action.payload.val.trim() !== "",
      };
    },
    company(state, action) {
      return {
        ...state,
        company: action.payload.val.trim() !== "",
      };
    },
    engine(state, action) {
      return {
        ...state,
        engine: action.payload.val.trim() !== "",
      };
    },
    mileage(state, action) {
      return {
        ...state,
        mileage:
          action.payload.val.trim() !== "" &&
          !isNaN(action.payload.val) &&
          action.payload.val > 0,
      };
    },
    image(state, action) {
      return {
        ...state,
        image: action.payload,
      };
    },
    allTrue(state) {
      return {
        ...state,
        type: true,
        modelName: true,
        company: true,
        engine: true,
        mileage: true,
        image: true,
      };
    },
    clear(state) {
      return {
        ...state,
        type: null,
        modelName: null,
        company: null,
        engine: null,
        mileage: null,
        image: null,
      };
    },
  },
});

export const validityActions = validitySlice.actions;
