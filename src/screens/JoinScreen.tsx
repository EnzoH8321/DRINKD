import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, TextInput, Button } from "react-native-paper";
import styles from "../styles/constant";

const JoinScreen: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <Headline style={override.headline}> Enter Party Code Below </Headline>
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
    marginBottom: 100,
  },
  button: {
    top: 50,
  },
});

export default JoinScreen;
