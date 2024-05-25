import {Linking} from "react-native";
import {AppLinking} from "../types";
import messaging from "@react-native-firebase/messaging";
import {buildDeepLinkFromNotificationData} from "../utils";

export const linking: AppLinking = {
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
    const linkingSubscription = Linking.addEventListener("url", onReceiveURL);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("Message handled in the background", remoteMessage);
    });

    const foreground = messaging().onMessage(async remoteMessage => {
      console.log("A new FCM message arrived", remoteMessage);
    });

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);
      if (typeof url === "string") {
        listener(url);
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
      foreground();
    };
  },
};
