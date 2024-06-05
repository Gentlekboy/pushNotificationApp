import React from "react";
import {GeofenceNavigatorParamList} from "./types";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AddGeofencesScreen from "../../screens/addGeofence/AddGeofencesScreen";
import GeofencesScreen from "../../screens/geofences/GeofencesScreen";

const Stack = createNativeStackNavigator<GeofenceNavigatorParamList>();

const GeofenceNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AddGeofence" component={AddGeofencesScreen} />

      <Stack.Screen name="GeofenceList" component={GeofencesScreen} />
    </Stack.Navigator>
  );
};

export default GeofenceNavigator;
