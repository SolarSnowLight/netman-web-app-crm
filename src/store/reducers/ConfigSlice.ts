import {createSlice} from "@reduxjs/toolkit";
import config from "../../configs/config.json";

const initialState = config;

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {}
});

export default configSlice.reducer;
