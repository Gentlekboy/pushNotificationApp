import React, {useEffect} from "react";
import {Linking, ActivityIndicator} from "react-native";
import messaging from "@react-native-firebase/messaging";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navigation/tab/TabNavigator";
import {
  geoFenceAction,
  onDisplayNotification,
} from "./src/screens/settings/utils";
import BackgroundGeolocation, {
  Subscription,
} from "react-native-background-geolocation";
import {
  buildDeepLinkFromNotificationData,
  requestUserPermission,
} from "./src/screens/map/utils";

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  LocationScreen: undefined;
};

function App(): React.JSX.Element {
  useEffect(() => {
    requestUserPermission();

    const onGeoFence: Subscription = BackgroundGeolocation.onGeofence(event => {
      console.log("[onGeoFence]", event);

      onDisplayNotification(
        "GEOFENCE ACTIVITY DETECTED",
        geoFenceAction(event.action, event.identifier),
      )
        .then(res => console.log("onDisplayNotification success", res))
        .catch(error => console.log("onDisplayNotification error", error));
    });

    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      url: "http://yourserver.com/locations",
      batchSync: false,
      autoSync: true,
      headers: {
        "X-FOO": "bar",
      },
      params: {
        auth_token: "maybe_your_server_authenticates_via_token_YES?",
      },
    }).then(state => {
      console.log("- BackgroundGeolocation Status: ", state.enabled);
    });

    return () => {
      console.log("Clearing the subscriptions");
      onGeoFence.remove();
    };
  }, []);

  return (
    <NavigationContainer
      linking={{
        prefixes: ["myapp://"],
        config: {
          screens: {Home: "Home", Settings: "Settings"},
        },
        async getInitialURL() {
          const url = await Linking.getInitialURL();
          if (typeof url === "string") {
            return url;
          }
          const message = await messaging().getInitialNotification();
          const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
          if (typeof deeplinkURL === "string") {
            return deeplinkURL;
          }
        },
        subscribe(listener: (url: string) => void) {
          const onReceiveURL = ({url}: {url: string}) => listener(url);

          const linkingSubscription = Linking.addEventListener(
            "url",
            onReceiveURL,
          );

          messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log("Message handled in the background", remoteMessage);
          });

          const foreground = messaging().onMessage(async remoteMessage => {
            console.log("A new FCM message arrived", remoteMessage);
          });

          const unsubscribe = messaging().onNotificationOpenedApp(
            remoteMessage => {
              const url = buildDeepLinkFromNotificationData(remoteMessage.data);
              if (typeof url === "string") {
                listener(url);
              }
            },
          );

          return () => {
            linkingSubscription.remove();
            unsubscribe();
            foreground();
          };
        },
      }}
      fallback={<ActivityIndicator animating />}>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
