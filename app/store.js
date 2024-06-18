import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./singleShot/imageSlice";
export const store = configureStore({
    // reducer:{},
    reducer: imageReducer,

})