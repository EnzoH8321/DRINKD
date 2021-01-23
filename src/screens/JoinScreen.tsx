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

      //returns if data is not found
      if (data === null || textValue.length === 0) {
        return Alert.alert("No Party Found");
      }

      console.log(data.partyId);
      setPartyCode(data.partyId);
    });
  }

  const [textValue, setTextValue] = useState("");
  const [partyCode, setPartyCode] = useState(false);

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

      {!partyCode ? (
        <Headline style={override.statusText}>You are not in a party</Headline>
      ) : (
        <Headline style={override.statusText}>
          Your party code is {partyCode}
        </Headline>
      )}
    </View>
  );
};

const override = StyleSheet.create({
  headline: {
    textAlign: "center",
    marginBottom: 100,
  },
  statusText: {
    textAlign: "center",
    marginBottom: 100,
    marginTop: 200,
  },
  button: {
    top: 50,
  },
});

export default JoinScreen;
