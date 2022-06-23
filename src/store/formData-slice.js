import { createSlice } from "@reduxjs/toolkit";

export const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    type: "",
    modelName: "",
    company: "",
    engine: "",
    mileage: "",
    image: "",
  },
  reducers: {
    userInput(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    },
    userImage(state, action) {
      console.log(action.payload);
      return {
        ...state,
        image: action.payload,
      };
    },
    update(state, action) {
      return {
        type: action.payload.type,
        modelName: action.payload.modelName,
        company: action.payload.company,
        engine: action.payload.engine,
        mileage: action.payload.mileage,
        id: action.payload.id,
        image: action.payload.image,
      };
    },
    submit(state) {
      return {
        type: "",
        modelName: "",
        company: "",
        engine: "",
        mileage: "",
        image: "",
        imagePath: "",
      };
    },
  },
});

export const formDataActions = formDataSlice.actions;
