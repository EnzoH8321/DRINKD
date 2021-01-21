import React from "react";
import styles from "../styles/constant";
import { Button } from "react-native-paper";

import { ApiSearch } from "../types/types";

const HomeButton = ({ cardID, apiFunc }) => {
  const { id } = cardID;

  return (
    <Button
      style={styles.homeButton}
      mode="contained"
      onPress={() => apiFunc(id)}
    >
      Get More Info
    </Button>
  );
};

export default HomeButton;
