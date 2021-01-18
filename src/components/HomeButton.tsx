import React from "react";
import styles from "../styles/constant";
import { Button } from "react-native-paper";

const HomeButton = () => {
  return (
    <Button style={styles.homeButton} mode="contained">
      Get More Info
    </Button>
  );
};

export default HomeButton;
