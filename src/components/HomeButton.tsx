import React from "react";
import styles from "../styles/constant";
import { Button } from "react-native-paper";

import fetchBusinessInfo from "../api/BusinessInfoApi";

import { ID } from "../types/types";

const HomeButton = ({ cardID, apiFunc }: ID) => {
  const { id } = cardID;

  return (
    <Button
      style={styles.homeButton}
      mode="contained"
      onPress={() => fetchBusinessInfo(id)}
    >
      Get More Info
    </Button>
  );
};

export default HomeButton;
