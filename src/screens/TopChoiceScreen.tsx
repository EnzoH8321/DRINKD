import React from "react";
import { View } from "react-native";
import { Text, Card, Title } from "react-native-paper";
import styles from "../styles/constant";

//Components
import MiniCardComponent from "../components/MiniCardComponent";

const TopChoicesScreen = () => {
  return (
    <View style={styles.container}>
      <MiniCardComponent />
    </View>
  );
};

export default TopChoicesScreen;
