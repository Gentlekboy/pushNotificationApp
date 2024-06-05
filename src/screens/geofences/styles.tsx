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
    backgroundColor: "orange",
    height: 50,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#C4C4C4",
  },
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
