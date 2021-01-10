import React from "react";
import { View, StyleSheet } from "react-native";
import { Headline, TextInput } from "react-native-paper";
import styles from "../styles/constant";

const JoinScreen = () => {
  return (
    <View style={styles.container}>
      <Headline> Test </Headline>
      <TextInput label="Party Code" />
    </View>
  );
};

const override = StyleSheet.create({});

export default JoinScreen;
