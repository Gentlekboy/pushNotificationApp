import {FlatList, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {styles} from "./styles";
import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";
import {GeofencesScreenNavProps} from "./types";

const GeofencesScreen = ({navigation}: GeofencesScreenNavProps) => {
  const [geoFenceList, setGeoFenceList] = React.useState<Geofence[]>([]);

  useEffect(() => {
    BackgroundGeolocation.getGeofences()
      .then(geofences => {
        setGeoFenceList(geofences);
      })
      .catch(error => {
        console.log("[getGeoFence] error", error);
      });
  }, []);

  if (geoFenceList.length < 1) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddGeofence")}
          style={styles.firstButtonContainer}>
          <Text style={styles.buttonText}>Add a location</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <Text style={styles.title}>GEOFENCES</Text>

      <FlatList
        data={geoFenceList}
        renderItem={({item, index}) => {
          const {identifier} = item;
          return (
            <View style={styles.flatList}>
              <Text style={styles.text}>{index + 1}</Text>
              <Text style={styles.text}>{identifier}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default GeofencesScreen;
