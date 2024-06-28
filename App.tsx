import React, {useEffect} from "react";
import {Linking, ActivityIndicator} from "react-native";
import messaging from "@react-native-firebase/messaging";
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navigation/tab/TabNavigator";
import {PersistGate} from "redux-persist/integration/react";
import {Provider as ReduxProvider} from "react-redux";
import {buildDeepLinkFromNotificationData} from "./src/screens/map/utils";
import store, {persistor} from "./src/store/appStore/store";
import {onDisplayNotification} from "./src/screens/settings/utils";

export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  LocationScreen: undefined;
};

function App(): React.JSX.Element {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              const deeplinkURL = buildDeepLinkFromNotificationData(
                message?.data,
              );
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

                const title =
                  remoteMessage.notification?.title ||
                  "Message handled in the background";
                const body =
                  remoteMessage.notification?.body ||
                  `${remoteMessage.notification}`;
                onDisplayNotification(title, body);
              });

              const foreground = messaging().onMessage(async remoteMessage => {
                console.log("A new FCM message arrived", remoteMessage);

                const title =
                  remoteMessage.notification?.title || "New FCM message";
                const body =
                  remoteMessage.notification?.body ||
                  `${remoteMessage.notification}`;
                onDisplayNotification(title, body);
              });

              const unsubscribe = messaging().onNotificationOpenedApp(
                remoteMessage => {
                  const url = buildDeepLinkFromNotificationData(
                    remoteMessage.data,
                  );
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
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
