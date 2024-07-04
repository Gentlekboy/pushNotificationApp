import {Switch, Text, View} from "react-native";
import React, {useEffect, useRef} from "react";
import {styles} from "./styles";
import BackgroundGeolocation from "react-native-background-geolocation";
import {useAppDispatch, useAppSelector} from "../../store/appStore/store";
import {toggleBackgroundService} from "../../store/slices/settingsSlice";

const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const {settingsSlice, deviceSlice} = useAppSelector(
    state => state.rootReducer,
  );

  const {deviceId} = deviceSlice;
  const {isBackgroundServiceRunning} = settingsSlice;

  const prevIsBackgroundServiceRunning = useRef(isBackgroundServiceRunning);

  useEffect(() => {
    if (
      prevIsBackgroundServiceRunning.current === false &&
      isBackgroundServiceRunning === true
    ) {
      BackgroundGeolocation.start()
        .then(res => console.log("BackgroundGeolocation.start", res.enabled))
        .catch(err => console.log("BackgroundGeolocation.start", err));
    } else if (
      prevIsBackgroundServiceRunning.current === true &&
      isBackgroundServiceRunning === false
    ) {
      BackgroundGeolocation.stop()
        .then(res => console.log("BackgroundGeolocation.stop", res.enabled))
        .catch(err => console.log("BackgroundGeolocation.stop", err));
    }

    prevIsBackgroundServiceRunning.current = isBackgroundServiceRunning;
  }, [isBackgroundServiceRunning]);

  return (
    <View style={styles.container}>
      <View style={styles.titleAndDescription}>
        <View>
          <Text style={styles.title}>Location Services</Text>

          <Text style={styles.description}>
            {isBackgroundServiceRunning
              ? "Turn off location services"
              : "Turn on location services"}
          </Text>
        </View>

        <View>
          <Switch
            value={isBackgroundServiceRunning}
            onValueChange={() => {
              dispatch(toggleBackgroundService());
            }}
          />
        </View>
      </View>

      <View>
        <Text style={styles.version}>Version 1.0.1</Text>

        <Text style={[styles.version, {fontSize: 10, marginBottom: 10}]}>
          {deviceId ? "FCM token retrieved" : "No FCM token yet"}
        </Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
