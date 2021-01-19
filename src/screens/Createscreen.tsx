import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, Button } from "react-native-paper";
import styles from "../styles/constant";

const CreateScreen: React.FC = () => {
  return (
    <View style={[styles.container, override.view]}>
      <Button mode="contained" style={styles.button}>
        Create Party
      </Button>
      <Headline style={override.headline}>Your party code is xxx</Headline>
    </View>
  );
};

const override = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  headline: {
    marginTop: 100,
  },
});

export default CreateScreen;
