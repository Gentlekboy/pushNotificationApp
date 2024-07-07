import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore, persistReducer} from "redux-persist";
import {rootReducer} from "../rootReducer";
import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {api} from "../../api/api";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./types";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rootReducer: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
