import notifee from "@notifee/react-native";

export const geoFenceAction = (action: string, place: string) => {
  switch (action) {
    case "ENTER":
      return `You have entered ${place}. Getting deals in a bit.`;

    case "EXIT":
      return `You have exited '${place}'`;

    default:
      return `You are dwelling in '${place}'`;
  }
};

export const onDisplayNotification = async (title: string, body: string) => {
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
