import React from "react";
import {Alert, Switch, Text, View} from "react-native";

import BackgroundGeolocation, {
  Location,
  Subscription,
} from "react-native-background-geolocation";
import notifee from "@notifee/react-native";

const LocationScreen = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState("");

  const geoFenceAction = (action: string, place: string) => {
    switch (action) {
      case "ENTER":
        return `You have entered ${place}`;

      case "EXIT":
        return `You have exited ${place}`;

      default:
        return `You are dwelling in ${place}`;
    }
  };

  const onDisplayNotification = async (title: string, body: string) => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
    });
  };

  React.useEffect(() => {
    const onGeoFence: Subscription = BackgroundGeolocation.onGeofence(event => {
      console.log("[onGeoFence]", event);

      onDisplayNotification(
        "GEOFENCE ACTIVITY DETECTED",
        geoFenceAction(event.action, event.identifier),
      )
        .then(res => console.log("onDisplayNotification success", res))
        .catch(error => console.log("onDisplayNotification error", error));
    });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: "http://yourserver.com/locations",
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {
        // <-- Optional HTTP headers
        "X-FOO": "bar",
      },
      params: {
        // <-- Optional HTTP params
        auth_token: "maybe_your_server_authenticates_via_token_YES?",
      },
    }).then(state => {
      setEnabled(state.enabled);
      console.log("- BackgroundGeolocation is configured and ready: ", state);
    });

    return () => {
      console.log("Clearing the subscriptions");
      onGeoFence.remove();
    };
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation("");
    }
  }, [enabled]);

  return (
    <View style={{alignItems: "center"}}>
      <Text>Click to enable BackgroundGeolocation</Text>

      <Switch value={enabled} onValueChange={setEnabled} />

      <Text style={{fontFamily: "monospace", fontSize: 12, color: "black"}}>
        {location}
      </Text>
    </View>
  );
};

export default LocationScreen;
