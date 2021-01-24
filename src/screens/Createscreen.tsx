import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, Button, TextInput } from "react-native-paper";
import styles from "../styles/constant";
//Actions
import { setPartyData } from "../actions/PartyActions";

//firebase
import firebase from "../utils/firebase";
import { useDispatch, useStore } from "react-redux";

const CreateScreen: React.FC = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const partyStatus = store.getState().party;

  function createPartyCode() {
    if (!partyName) {
      return Alert.alert("You must name your party");
    }

    const randomNumber = Math.floor(
      Math.pow(10, 8 - 1) + Math.random() * 9 * Math.pow(10, 8 - 1)
    ).toString();

    firebase.database().ref(`parties/${randomNumber}`).set({
      partyId: randomNumber,
      partyName: partyName,
    });

    dispatch(setPartyData(true));
    setPartyCode(randomNumber);
  }

  const [partyCode, setPartyCode] = useState("");
  const [partyName, setPartyName] = useState();

  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.textInput}
        value={partyName}
        onChangeText={(name) => setPartyName(name)}
      ></TextInput>
      <Button mode="contained" style={styles.button} onPress={createPartyCode}>
        Create Party
      </Button>
      <Headline style={override.headline}>Party Code is {partyCode}</Headline>
      <Headline style={override.headline}>Party Name is {partyName}</Headline>
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
