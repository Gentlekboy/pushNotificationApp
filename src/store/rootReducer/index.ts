import {combineReducers} from "@reduxjs/toolkit";
import settingsSlice from "../slices/settingsSlice";
import deviceSlice from "../slices/deviceSlice";
import goefenceSlice from "../slices/goefenceSlice";

export const rootReducer = combineReducers({
  settingsSlice: settingsSlice,
  deviceSlice: deviceSlice,
  goefenceSlice: goefenceSlice,
});
