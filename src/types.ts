import {LinkingOptions} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

export type AppLinking =
  | LinkingOptions<{
      Home: string;
      Settings: string;
    }>
  | undefined;

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  LocationScreen: undefined;
};

export type HomeNavProps = NativeStackScreenProps<AppStackParamList, "Home">;

export type GeoFenceData = {
  identifier: string;
  radius: number;
  latitude: number;
  longitude: number;
  notifyOnEntry: boolean;
  notifyOnExit: boolean;
  extras?: {
    route_id: number;
  };
};
