import {Switch, Text, View} from "react-native";
import React from "react";
import {styles} from "./styles";
import BackgroundGeolocation, {
  Subscription,
} from "react-native-background-geolocation";
import {geoFenceAction, onDisplayNotification} from "./utils";

const SettingsScreen = () => {
  const [enabled, setEnabled] = React.useState(false);
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    const onGeoFence: Subscription = BackgroundGeolocation.onGeofence(event => {
      onDisplayNotification(
        "Geofence Activity Detected",
        geoFenceAction(event.action, event.identifier),
      )
        .then(res => console.log("onDisplayNotification success", res))
        .catch(error => console.log("onDisplayNotification error", error));
    });

    // BackgroundGeolocation.ready({
    //   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    //   distanceFilter: 10,
    //   stopTimeout: 5,
    //   debug: true,
    //   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    //   stopOnTerminate: false,
    //   startOnBoot: true,
    //   url: "http://yourserver.com/locations",
    //   batchSync: false,
    //   autoSync: true,
    //   headers: {
    //     "X-FOO": "bar",
    //   },
    //   params: {
    //     auth_token: "maybe_your_server_authenticates_via_token_YES?",
    //   },
    // }).then(state => {
    //   setEnabled(state.enabled);
    //   console.log("- BackgroundGeolocation is configured and ready: ", state);
    // });

    return () => {
      onGeoFence.remove();
    };
  }, []);

  React.useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
      setLocation("");
    }
  }, [enabled]);

  return (
    <View style={styles.container}>
      <View style={styles.titleAndDescription}>
        <View>
          <Text style={styles.title}>Location Services</Text>

          <Text style={styles.description}>
            {enabled
              ? "Turn off location services"
              : "Turn on location services"}
          </Text>
        </View>

        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  );
};

export default SettingsScreen;
