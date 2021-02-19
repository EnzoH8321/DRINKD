import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    top: 100,
  },
  button: {
    marginTop: "10%",
    width: "50%",
    alignSelf: "center",
  },
  border: {
    borderRadius: 15,
  },
  shadow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 2,
  },
  fontL: {
    fontSize: 24,
  },
  fontM: {
    fontSize: 22,
  },
  fontS: {
    fontSize: 14,
  },
  colorPrimary: {
    backgroundColor: "#EDC126",
  },
  colorSecondary: {
    backgroundColor: "#FFFFFF",
  },
});

export default styles;
