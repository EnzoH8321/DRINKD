import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import styles from "../styles/constant";

const CreateScreen = () => {
  return (
    <View style={[styles.container, override.view]}>
      <Headline style={override.headline}>Your Party</Headline>
      <Headline>Your code</Headline>
    </View>
  );
};

const override = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  headline: {
    marginBottom: 100,
  },
});

export default CreateScreen;
