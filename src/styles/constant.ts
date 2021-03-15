import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    height: "100%",
  },
  dataContainer: {
    marginTop: "30%",
  },
  button: {
    marginTop: "10%",
    width: "50%",
    alignSelf: "center",
  },
  border: {
    borderRadius: 15,
  },

  icon: {
    fontSize: 32,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.62,
    elevation: 4,
  },
  fontL: {
    fontSize: 24,
  },
  fontM: {
    fontSize: 20,
  },
  fontS: {
    fontSize: 16,
  },
  colorPrimary: {
    backgroundColor: "#ec2113",
  },
  colorSecondary: {
    backgroundColor: "#FFFFFF",
  },
  colorTertiary: {
    backgroundColor: "#ec2113",
  },
  headline: {
    textAlign: "center",
    marginBottom: "20%",
  },
  header: {
    backgroundColor: "black",
    alignSelf: "center",
  },
});

export default styles;
