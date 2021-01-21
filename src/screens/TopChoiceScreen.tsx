import React from "react";
import { View } from "react-native";

import styles from "../styles/constant";

//Components
import MiniCardComponent from "../components/MiniCardComponent";

const TopChoicesScreen = () => {
  return (
    <View style={styles.container}>
      <MiniCardComponent />
      <MiniCardComponent />
      <MiniCardComponent />
    </View>
  );
};

export default TopChoicesScreen;
