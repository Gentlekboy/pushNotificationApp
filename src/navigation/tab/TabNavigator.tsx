import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabNavigatorParamList} from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import MapScreen from "../../screens/map/MapScreen";
import GeofencesScreen from "../../screens/geofences/GeofencesScreen";
import NotificationScreen from "../../screens/notification/NotificationScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}>
      <Tab.Screen
        name="Home"
        component={MapScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="GeoFences"
        component={GeofencesScreen}
        options={{
          tabBarLabel: "GeoFences",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="notifications"
              color={color}
              size={size}
            />
          ),
          tabBarBadge: 3,
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
