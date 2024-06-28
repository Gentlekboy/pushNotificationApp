import {useCallback} from "react";
import {useLazyGetPointOfInterestQuery} from "../api/api";
import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";
import {Alert} from "react-native";

const useGetPointOfInterest = () => {
  const [getPointOfInterest, {isFetching}] = useLazyGetPointOfInterestQuery();

  const onGetPointOfInterest = useCallback(() => {
    getPointOfInterest()
      .unwrap()
      .then(res => {
        if (res.data) {
          const geofences = res.data.map<Geofence>(
            ({id, longitude, latitude, radius}, index) => {
              const name = res.data ? res.data[index].name : "Unknown Place";

              return {
                identifier: id,
                radius,
                latitude,
                longitude,
                notifyOnEntry: true,
                notifyOnExit: true,
                notifyOnDwell: true,
                extras: {name},
              };
            },
          );

          BackgroundGeolocation.removeGeofences()
            .then(res => {
              BackgroundGeolocation.addGeofences(geofences)
                .then(success => {})
                .catch(error => {
                  Alert.alert("Geofence addition alert", `${error}`);
                });
            })
            .catch(error => Alert.alert("Geofence removal alert", `${error}`));
        }
      })
      .catch(error => {
        const message = error.error;

        Alert.alert("Point of interest alert", `${message}`);
      });
  }, [getPointOfInterest]);

  return {onGetPointOfInterest, isFetching};
};

export default useGetPointOfInterest;
