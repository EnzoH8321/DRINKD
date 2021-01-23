import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Headline, Button } from "react-native-paper";
import styles from "../styles/constant";

//firebase
import firebase from "../utils/firebase";

const CreateScreen: React.FC = () => {
  function createPartyCode() {
    const randomNumber = Math.floor(
      Math.pow(10, 8 - 1) + Math.random() * 9 * Math.pow(10, 8 - 1)
    ).toString();

    firebase.database().ref("parties/").set({
      userId: randomNumber,
    });

    setPartyCode(randomNumber);
  }

  const [partyCode, setPartyCode] = useState("");

  return (
    <View style={[styles.container, override.view]}>
      <Button mode="contained" style={styles.button} onPress={createPartyCode}>
        Create Party
      </Button>
      <Headline style={override.headline}>
        Your Party Code is {partyCode}
      </Headline>
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
