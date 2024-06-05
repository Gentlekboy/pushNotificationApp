import {Alert} from "react-native";
import {AlertType, AlertTypeResult} from "./types";
import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";

export const showAlertType = (alertType: AlertType): AlertTypeResult => {
  switch (alertType) {
    case "addGeofenceFailure":
      return {
        title: "Geofence Addition Failed",
        message: "Unable to add location. Please try again later.",
      };

    case "addGeofenceSuccess":
      return {
        title: "Geofence Addition Successful",
        message: "Location added",
      };

    case "locationTimeout":
      return {
        title: "Location Timeout",
        message: "Fetching location took too long. Please try again.",
      };

    case "locationFailure":
      return {
        title: "Location Failure",
        message: "Failed to retrieve location. Ensure your GPS is enabled.",
      };

    case "noLocationSelected":
      return {
        title: "No Location Selected",
        message: "Please select a location before proceeding.",
      };

    default:
      return {
        title: "Unknown Error",
        message: "An unknown error occurred. Please try again.",
      };
  }
};

export const showAlert = (alertType: AlertType, customMessage?: string) => {
  const {title, message} = showAlertType(alertType);

  return Alert.alert(title, customMessage || message);
};

export const addNewGeofence = (selectedLocation: Geofence) => {
  BackgroundGeolocation.addGeofence(selectedLocation)
    .then(res => showAlert("addGeofenceSuccess"))
    .catch(error => showAlert("addGeofenceFailure", error));
};
