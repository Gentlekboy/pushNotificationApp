import {useCallback, useEffect, useState} from "react";
import {useSendPushMutation} from "../api/api";
import {SendPushRequest} from "../api/types";
import {onDisplayNotification} from "../screens/settings/utils";
import {AppState, Alert, AppStateStatus} from "react-native";

const useSendPush = () => {
  const [sendPush] = useSendPushMutation();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const onSendPush = useCallback(
    (data: SendPushRequest) => {
      sendPush(data)
        .unwrap()
        .then(res => {})
        .catch(err => {
          const errorMessage = err.data.description || "Something went wrong";

          if (appState === "background") {
            onDisplayNotification(
              "Push Notification For Geofence Activity",
              errorMessage,
            );
          } else {
            Alert.alert(
              "Push Notification For Geofence Activity",
              errorMessage,
            );
          }
        });
    },
    [sendPush, appState],
  );

  return {onSendPush};
};

export default useSendPush;
