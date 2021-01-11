import React from "react";
import { View } from "react-native";

import styles from "../styles/constant";

//Components
import CardComponent from "../components/CardComponent";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <CardComponent />
    </View>
  );
};

export default HomeScreen;
