import messaging from "@react-native-firebase/messaging";

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const token = await messaging().getToken();
    console.log("FCM token:", token);
  }
};

export const buildDeepLinkFromNotificationData = (data: any): string | null => {
  const NAVIGATION_IDS = ["home", "settings"];

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
};
