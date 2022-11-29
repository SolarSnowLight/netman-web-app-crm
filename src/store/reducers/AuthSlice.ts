import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authSignIn } from "../actions/AuthActions";
import IAttributes from "../../models/users/IAttributes";
import IModules from "../../models/users/IModules";
import IAuthResponse from "../../models/users/auth/IAuthResponse";
import storeConfig from "../../configs/store.config.json";

interface AuthState {
  // Common data
  type_auth: string | null | undefined;
  access_token: string | null | undefined;
  refresh_token: string | null | undefined;
  users_id: number | null | undefined;
  attributes: IAttributes | null | undefined;
  modules: IModules | null | undefined;
  isAuthenticated: boolean | null | undefined;

  // Communication haracteristics
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  type_auth: null,
  access_token: null,
  refresh_token: null,
  users_id: null,
  attributes: null,
  modules: null,
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData(state: AuthState, action: PayloadAction<IAuthResponse>) {
      state.type_auth = action.payload.type_auth;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.attributes = action.payload.attributes;
      state.modules = action.payload.modules;
      state.users_id = action.payload.users_id;

      localStorage.setItem(
        storeConfig["main-store"],
        JSON.stringify({
          ...state,
        })
      );
    },
    signIn(state: AuthState) {
      state.isLoading = true;
    },
    signInSuccess(state: AuthState, action: PayloadAction<IAuthResponse>) {
      state.isLoading = false;
      state.error = "";

      state.type_auth = action.payload.type_auth;
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.attributes = action.payload.attributes;
      state.modules = action.payload.modules;
      state.users_id = action.payload.users_id;

      localStorage.setItem(
        storeConfig["main-store"],
        JSON.stringify({
          ...state,
        })
      );
    },
    signInError(state: AuthState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state: AuthState, action: PayloadAction<string>) {},
  },
});

export default authSlice.reducer;
