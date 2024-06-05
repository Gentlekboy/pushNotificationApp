import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {GeofenceNavigatorParamList} from "../../navigation/stack/types";

export type AddGeofenceNavProps = NativeStackScreenProps<
  GeofenceNavigatorParamList,
  "AddGeofence"
>;

export type AlertType =
  | "locationTimeout"
  | "locationFailure"
  | "addGeofenceFailure"
  | "addGeofenceSuccess"
  | "noLocationSelected";

export type AlertTypeResult = {
  title: string;
  message: string;
};
