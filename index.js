/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import notifee, {EventType} from "@notifee/react-native";

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  console.log("type", type);
  console.log("detail", detail);

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === "mark-as-read") {
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: "POST",
    // });

    console.log("Do something if notification is pressed");

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
