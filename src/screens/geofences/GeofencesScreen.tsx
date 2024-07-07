import {FlatList, Text, View} from "react-native";
import React from "react";
import {styles} from "./styles";
import {useAppSelector} from "../../store/appStore/store";

const GeofencesScreen = () => {
  const {listOfGeofences: geoFenceList} = useAppSelector(
    state => state.rootReducer.goefenceSlice,
  );

  if (geoFenceList.length < 1) {
    return (
      <View style={[styles.container, styles.firstButtonContainer]}>
        <Text style={styles.buttonText}>No Geofences added yet</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <Text style={styles.title}>GEOFENCES</Text>

      <FlatList
        data={geoFenceList}
        renderItem={({item, index}) => {
          const {name} = item;
          return (
            <View style={styles.flatList}>
              <Text style={styles.text}>{index + 1}</Text>
              <Text style={styles.text}>{name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default GeofencesScreen;
