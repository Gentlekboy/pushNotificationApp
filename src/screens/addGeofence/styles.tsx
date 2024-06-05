import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  textInputContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    height: 53,
    borderRadius: 5,
  },
  textInput: {
    height: "auto",
    color: "#8A8888",
    fontSize: 15,
    backgroundColor: "transparent",
    fontFamily: "Hind-Regular",
  },
  listView: {
    position: "relative",
    zIndex: 3,
    marginTop: 0,
    padding: 0,
  },
  row: {
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#C4C4C4",
  },
  text: {
    color: "#230501",
    fontSize: 15,
    fontFamily: "Hind-Regular",
  },
  secondButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "green",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
});
