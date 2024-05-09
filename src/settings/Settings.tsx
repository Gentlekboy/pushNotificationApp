import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../App";

type HomeNavProps = NativeStackScreenProps<AppStackParamList, "Settings">;

const Settings = ({navigation}: HomeNavProps) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
          backgroundColor: "yellow",
        }}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
