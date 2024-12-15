import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice.js";
import { contactsReducer } from "./contacts/slice.js";
import { filtersReducer } from "./filters/selectors.js";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistContactsConfig = {
  key: "contacts",
  storage,
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedContactsReducer = persistReducer(
  persistContactsConfig,
  contactsReducer
);

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    contacts: persistedContactsReducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export default store;
