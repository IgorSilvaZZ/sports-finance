import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import responsibleSlice from "./responsible/responsible.slice";

const persistConfig = {
  key: "my-finances",
  storage,
};

const rootReducer = combineReducers({
  responsible: responsibleSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
