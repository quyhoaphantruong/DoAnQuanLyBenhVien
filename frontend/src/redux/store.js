import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import appStateReducer from "./features/appStateSlice";
import treatmentPlanReducer from "./features/treatmentPlanSlice";
import patientReducer from "./features/patientSlice";
import staffReducer from "./features/staffSlice";
import dentistReducer from "./features/dentistSlice";

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
  patient: patientReducer,
  dentist: dentistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);
