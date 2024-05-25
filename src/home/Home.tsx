import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import BackgroundGeolocation, {
  Geofence,
} from "react-native-background-geolocation";
import {customGeofences} from "../data/customGeofences";
import {HomeNavProps} from "../types";

const Home = ({navigation}: HomeNavProps) => {
  const [geoFenceList, setGeoFenceList] = React.useState<Geofence[]>([]);

  useEffect(() => {
    BackgroundGeolocation.removeGeofences()
      .then(res => {
        console.log("[removeGeofences] success", res);

        BackgroundGeolocation.addGeofences(customGeofences)
          .then(success => {
            console.log("[addGeofence] success", success);

            BackgroundGeolocation.getGeofences()
              .then(geofences => {
                setGeoFenceList(geofences);
              })
              .catch(error => {
                console.log("[getGeoFence] error", error);
              });
          })
          .catch(error => {
            console.log("[addGeofence] FAILURE: ", error);
          });
      })
      .catch(error => console.log("[removeGeofences] FAILURE: ", error));
  }, []);

  if (geoFenceList.length < 1) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("LocationScreen")}
          style={styles.firstButtonContainer}>
          <Text style={styles.buttonText}>Go to Location Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>GEOFENCES</Text>

      <FlatList
        data={geoFenceList}
        renderItem={({item, index}) => {
          const {identifier} = item;
          return (
            <View style={styles.flatList}>
              <Text style={styles.text}>{index + 1}</Text>
              <Text style={styles.text}>{identifier}</Text>
            </View>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("LocationScreen")}
        style={styles.secondButtonContainer}>
        <Text style={styles.buttonText}>Go to Location Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "white",
  },
  firstButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "green",
  },
  secondButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "green",
    alignItems: "center",
  },
  text: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "black",
  },
  title: {
    fontFamily: "monospace",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
    marginVertical: 4,
    color: "black",
  },
  flatList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
    marginHorizontal: 2,
  },
});
