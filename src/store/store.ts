/* Libraries */
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postAPI } from "../services/PostService";
import authReducer from "./reducers/AuthSlice";
import messageQueueReducer from "./reducers/MessageQueueSlice";
import configReducer from "./reducers/ConfigSlice";

/* Configs */
import storageConfig from "src/configs/store.config.json";

/* Root Reducer */
const rootReducer = combineReducers({
  authReducer,
  configReducer,
  messageQueueReducer,
  // [postAPI.reducerPath]: postAPI.reducer,
});

const persistConfig = {
  key: storageConfig["main-store"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = () => {
  return store;
}

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];