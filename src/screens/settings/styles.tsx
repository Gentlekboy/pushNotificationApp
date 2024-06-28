import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  titleAndDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Hind-Regular",
    color: "#000",
  },
  description: {
    fontSize: 12,
    fontFamily: "Hind-Regular",
    fontWeight: "400",
    color: "#000",
  },
  version: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Hind-Regular",
    color: "#000",
    textAlign: "center",
  },
});
