import {View} from "react-native";
import React from "react";
import {styles} from "./styles";
import MapView, {Circle} from "react-native-maps";
import {customGeofences} from "../../data/customGeofences";

const MapScreen = () => {
  return (
    <View style={styles.container}>
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
        {customGeofences.map(({latitude, longitude, radius, identifier}) => {
          return (
            <Circle
              key={identifier}
              fillColor="transparent"
              strokeWidth={1}
              strokeColor="blue"
              center={{
                latitude,
                longitude,
              }}
              radius={radius}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default MapScreen;
