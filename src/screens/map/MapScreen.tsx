import {ActivityIndicator, View} from "react-native";
import React, {useEffect} from "react";
import {styles} from "./styles";
import MapView, {Circle} from "react-native-maps";
import useGetPointOfInterest from "../../hooks/useGetPointOfInterest";
import {useAppSelector} from "../../store/appStore/store";

const MapScreen = () => {
  const {onGetPointOfInterest, isFetching} = useGetPointOfInterest();

  const {listOfGeofences} = useAppSelector(
    state => state.rootReducer.goefenceSlice,
  );

  useEffect(() => {
    onGetPointOfInterest();
  }, []);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <View style={{marginVertical: 20}}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : null}

      <MapView
        style={styles.map}
        initialRegion={undefined}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        zoomControlEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        onRegionChange={(region, details) => {}}>
        {listOfGeofences.map(({latitude, longitude, radius, name}) => {
          return (
            <Circle
              key={name}
              fillColor="rgba(0, 255, 0, 0.05)"
              strokeWidth={1}
              strokeColor="rgba(0, 255, 0, 1)"
              center={{
                latitude: latitude || 0,
                longitude: longitude || 0,
              }}
              radius={radius || 500}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default MapScreen;
