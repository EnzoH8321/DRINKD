import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    top: 100,
  },
  //Card Component
  cardComponent: {},
  cardImage: {},
  //Mini Card Component
  miniCardComponent: {},
  //Bottom Sheet Component
  sheetContainer: {
    backgroundColor: "white",
    padding: 16,
    height: "100%",
  },
  carousel: {
    height: 300,
  },
  iconList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageArray: {
    flexDirection: "row",
  },
  //Home button
  homeButton: {
    marginTop: 100,
  },
  button: {
    width: "50%",
    alignSelf: "center",
  },
  arrayImage: {
    height: 200,
    width: 200,
  },
});

export default styles;
