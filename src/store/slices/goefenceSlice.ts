import {createSlice} from "@reduxjs/toolkit";
import {GeofenceSliceType} from "./types";
import {api} from "../../api/api";

const initialState: GeofenceSliceType = {
  listOfGeofences: [],
};

const goefenceSlice = createSlice({
  name: "goefenceSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      api.endpoints.getPointOfInterest.matchFulfilled,
      (state, {payload}) => {
        const geofences = payload.data;

        if (geofences) {
          state.listOfGeofences = geofences;
        }
      },
    );
  },
});

export const {} = goefenceSlice.actions;
export default goefenceSlice.reducer;
