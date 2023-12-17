import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import appStateReducer from "./features/appStateSlice";
import treatmentPlanReducer from "./features/treatmentPlanSlice";
import staffReducer from "./features/staffSlice";

import { persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  whitelist: ["username"],
};

const staffPersitConfig = {
  key: "staff",
  storage: sessionStorage,
  whitelist: ["dsNhanvien"],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  appState: appStateReducer,
  staff: persistReducer(staffPersitConfig, staffReducer),
  treatmentPlan: treatmentPlanReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
