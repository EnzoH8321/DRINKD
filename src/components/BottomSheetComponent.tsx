import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View style={styles.iconList}>
        <List.Icon icon="phone" />
        <List.Icon icon="food" />
        <List.Icon icon="map" />
      </View>
    </View>
  );
};

export default CustomSheet;
