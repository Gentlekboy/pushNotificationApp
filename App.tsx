import React, {useState, useEffect} from "react";
import {Linking, ActivityIndicator} from "react-native";
import messaging from "@react-native-firebase/messaging";
import {NavigationContainer, useNavigation} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/home/Home";
import Settings from "./src/settings/Settings";
import LocationScreen from "./src/location/LocationScreen";

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  LocationScreen: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const NAVIGATION_IDS = ["home", "settings"];

function buildDeepLinkFromNotificationData(data: any): string | null {
  console.log("deep link data", data);
  console.log("==========================================");

  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) {
    return null;
  }
  if (navigationId === "home") {
    return "myapp://Home";
  }
  if (navigationId === "settings") {
    return "myapp://Settings";
  }

  return null;
}

function App(): React.JSX.Element {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log("Authorization status:", authStatus);
        const token = await messaging().getToken();
        console.log("FCM token:", token);
      }
    }

    requestUserPermission();
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
          //getInitialNotification: When the application is opened from a quit state.
          const message = await messaging().getInitialNotification();
          const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
          if (typeof deeplinkURL === "string") {
            return deeplinkURL;
          }
        },
        subscribe(listener: (url: string) => void) {
          const onReceiveURL = ({url}: {url: string}) => listener(url);

          // Listen to incoming links from deep linking
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

          //onNotificationOpenedApp: When the application is running, but in the background.
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Settings" component={Settings} />

        <Stack.Screen name="LocationScreen" component={LocationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
