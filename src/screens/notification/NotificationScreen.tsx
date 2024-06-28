import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import useSendPush from "../../hooks/useSendPush";
import {useAppSelector} from "../../store/appStore/store";

const NotificationScreen = () => {
  const {onSendPush} = useSendPush();

  const {deviceId} = useAppSelector(state => state.rootReducer.deviceSlice);

  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: "Hind-Regular",
          color: "#000",
        }}>
        No Notification yet
      </Text>
    </View>
  );
};

export default NotificationScreen;
