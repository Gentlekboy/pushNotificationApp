export const buildDeepLinkFromNotificationData = (data: any) => {
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
