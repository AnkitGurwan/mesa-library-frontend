import { configureStore } from "@reduxjs/toolkit";
import allFilesReducer from "./storage/storageSlice";


const store = configureStore({
    reducer:{
        Files : allFilesReducer
    }
})

export default store;