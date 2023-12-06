import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import appStateReducer from "./features/appStateSlice";

import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  whitelist: ["username"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  appState: appStateReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
