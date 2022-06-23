import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export const addVehicle = createAsyncThunk(
  "vehicles/addVehicles",
  async (payload) => {
    console.log(payload);
    const response = await addDoc(collection(db, "vehicles"), payload);
    return { id: response.id, payload };
  }
);

export const editVehicle = createAsyncThunk(
  "vehicles/editVehicle",
  async (payload) => {
    const { type, modelName, engine, mileage, id, company, image, imagePath } =
      payload;
    await setDoc(doc(db, "vehicles", id), {
      type,
      modelName,
      company,
      engine,
      image,
      mileage,
      imagePath,
    });
    return payload;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    currentVehicles: [],
  },
  reducers: {
    setVehicles(state, action) {
      return {
        ...state,
        currentVehicles: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(editVehicle.pending, () => {
        console.log("loading");
      })
      .addCase(editVehicle.fulfilled, (state, action) => {
        console.log(action.payload);
        const {
          type,
          modelName,
          company,
          mileage,
          id,
          image,
          engine,
          imagePath,
        } = action.payload;
        return {
          ...state,
          currentVehicles: state.currentVehicles.map((item) => {
            if (item.id !== action.payload.id) {
              return item;
            } else {
              return {
                type,
                modelName,
                company,
                mileage,
                id,
                image,
                engine,
                imagePath,
              };
            }
          }),
        };
      })
      .addCase(editVehicle.rejected, (state, action) => {
        console.log("failed");
      });
  },
});

export const vehicleActions = vehicleSlice.actions;
