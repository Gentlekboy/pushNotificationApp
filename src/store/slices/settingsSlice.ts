import {createSlice} from "@reduxjs/toolkit";
import {SettingsSliceType} from "./types";

const initialState: SettingsSliceType = {
  isBackgroundServiceRunning: true,
};

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState,
  reducers: {
    toggleBackgroundService(state) {
      state.isBackgroundServiceRunning = !state.isBackgroundServiceRunning;
    },
  },
});

export const {toggleBackgroundService} = settingsSlice.actions;
export default settingsSlice.reducer;
