import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, TextInput, Button } from "react-native-paper";
import styles from "../styles/constant";

//firebase
import firebase from "../utils/firebase";

const JoinScreen: React.FC = () => {
  //Join Party
  function joinParty() {
    const ref = firebase.database().ref(`parties/${textValue}`);

    ref.on("value", (snapshot) => {
      const data = snapshot.val();

      if (data === null) {
        Alert.alert("No Party Found");
      }
    });
  }

  const [textValue, setTextValue] = useState("");

  return (
    <View style={[styles.container]}>
      <Headline style={override.headline}> Enter Party Code Below </Headline>
      <TextInput
        label="Party Code"
        value={textValue}
        onChangeText={(text) => setTextValue(text)}
      />
      <Button
        mode="contained"
        style={[styles.button, override.button]}
        onPress={joinParty}
      >
        Go
      </Button>
    </View>
  );
};

const override = StyleSheet.create({
  headline: {
    textAlign: "center",
    marginBottom: 100,
  },
  button: {
    top: 50,
  },
});

export default JoinScreen;
