import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, TextInput, Button } from "react-native-paper";
import styles from "../styles/constant";

const JoinScreen = () => {
  return (
    <View style={[styles.container, override.view]}>
      <Headline style={override.headline}> Test </Headline>
      <TextInput label="Party Code" />
      <Button mode="contained" style={[styles.button, override.button]}>
        Go
      </Button>
    </View>
  );
};

const override = StyleSheet.create({
  headline: {
    textAlign: "center",
  },
  button: {
    top: 50,
  },
});

export default JoinScreen;
