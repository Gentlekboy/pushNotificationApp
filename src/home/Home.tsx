import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../App";

type HomeNavProps = NativeStackScreenProps<AppStackParamList, "Home">;

const Home = ({navigation}: HomeNavProps) => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Settings")}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
          backgroundColor: "green",
        }}>
        <Text>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
