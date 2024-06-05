import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {styles} from "./styles";
import {AddGeofenceNavProps} from "./types";
import {Geofence} from "react-native-background-geolocation";
import {addNewGeofence, showAlert} from "./utils";
import {GOOGLE_PLACES_API} from "@env";

const AddGeofencesScreen = ({navigation}: AddGeofenceNavProps) => {
  const [selectedLocation, setSelectedLocation] = useState<Geofence>();

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <Text style={[styles.text, {marginTop: 20}]}>Add Geofence</Text>

      <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          placeholder="Search location"
          minLength={2}
          fetchDetails={true}
          isRowScrollable={true}
          keepResultsAfterBlur={false}
          enablePoweredByContainer={false}
          listLoaderComponent={<ActivityIndicator size="small" color="green" />}
          timeout={300}
          onTimeout={() => showAlert("locationTimeout")}
          onFail={error => showAlert("locationFailure", error)}
          enableHighAccuracyLocation={true}
          styles={styles}
          onPress={(data, details) => {
            console.log("details", details);

            if (details) {
              const newLocation: Geofence = {
                identifier: details?.name,
                radius: 500,
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
                notifyOnEntry: true,
                notifyOnExit: true,
                notifyOnDwell: true,
              };

              console.log("newLocation", newLocation);

              setSelectedLocation(newLocation);
            }
          }}
          query={{
            key: GOOGLE_PLACES_API,
            language: "en",
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={
            selectedLocation
              ? () => addNewGeofence(selectedLocation)
              : () => showAlert("noLocationSelected")
          }
          style={styles.secondButtonContainer}>
          <Text style={{...styles.text, color: "white"}}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("GeofenceList")}
          style={styles.secondButtonContainer}>
          <Text style={{...styles.text, color: "white"}}>
            View Geofenced areas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddGeofencesScreen;
