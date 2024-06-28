import {AppGeofence} from "../../api/types";

export type SettingsSliceType = {
  isBackgroundServiceRunning: boolean;
};

export type DeviceSliceType = {
  deviceId: string;
};

export type GeofenceSliceType = {
  listOfGeofences: AppGeofence[];
};
