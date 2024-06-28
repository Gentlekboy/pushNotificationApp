import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {DeviceSliceType, SettingsSliceType} from "./types";

const initialState: DeviceSliceType = {
  deviceId: "",
};

const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    saveFcmToken(state, actions: PayloadAction<string>) {
      state.deviceId = actions.payload;
    },
  },
});

export const {saveFcmToken} = deviceSlice.actions;
export default deviceSlice.reducer;
