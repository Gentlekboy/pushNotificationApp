import React, {useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabNavigatorParamList} from "./types";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import MapScreen from "../../screens/map/MapScreen";
import NotificationScreen from "../../screens/notification/NotificationScreen";
import SettingsScreen from "../../screens/settings/SettingsScreen";
import messaging from "@react-native-firebase/messaging";
import {useAppDispatch, useAppSelector} from "../../store/appStore/store";
import {saveFcmToken} from "../../store/slices/deviceSlice";
import GeofencesScreen from "../../screens/geofences/GeofencesScreen";
import useSendPush from "../../hooks/useSendPush";
import BackgroundGeolocation, {
  Subscription,
} from "react-native-background-geolocation";
import {
  geoFenceAction,
  onDisplayNotification,
} from "../../screens/settings/utils";
import {Alert} from "react-native";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

const TabNavigator = () => {
  const dispatch = useAppDispatch();

  const {onSendPush} = useSendPush();

  const {deviceSlice, settingsSlice} = useAppSelector(
    state => state.rootReducer,
  );
  const {isBackgroundServiceRunning} = settingsSlice;
  const {deviceId} = deviceSlice;

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging()
          .getToken()
          .then(token => {
            token && dispatch(saveFcmToken(token));
          })
          .catch(error => {
            const errorMessage =
              error || "Something went wrong getting FCM token";
            console.log("FCM ERROR", error);
            Alert.alert("FCM ERROR", `${errorMessage}`);
          });
      }
    };

    requestUserPermission();
  }, [messaging]);

  useEffect(() => {
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
    })
      .then(state => {
        console.log("- BackgroundGeolocation Status: ", state.enabled);
      })
      .catch(error => console.log("Background location ready failed", error));

    BackgroundGeolocation.onGeofence(event => {
      const message = geoFenceAction(
        event.action,
        event.extras?.name as string,
      );

      if (event.action === "ENTER") {
        if (deviceId) {
          onSendPush({poiId: event.identifier, userOrDeviceId: deviceId});
        } else {
          onDisplayNotification("No FCM token", message);
        }
      }

      onDisplayNotification("Geofence Activity Detected", message);
    });
  }, []);

  useEffect(() => {
    if (isBackgroundServiceRunning) {
      BackgroundGeolocation.startGeofences()
        .then(res => console.log("BackgroundGeolocation.start", res.enabled))
        .catch(err => console.log("BackgroundGeolocation.start", err));
    } else {
      BackgroundGeolocation.stop()
        .then(res => console.log("BackgroundGeolocation.stop", res.enabled))
        .catch(err => console.log("BackgroundGeolocation.stop", err));
    }
  }, [isBackgroundServiceRunning]);

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
        name="GeofenceList"
        component={GeofencesScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarLabel: "GeoFences",
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          unmountOnBlur: true,
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
      /> */}

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          unmountOnBlur: true,
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
