import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  titleAndDescription: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "700",
    fontFamily: "Hind-Regular",
  },
  description: {
    fontSize: 12,
    fontFamily: "Hind-Regular",
  },
});
