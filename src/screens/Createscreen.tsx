import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, Button, TextInput } from "react-native-paper";
import styles from "../styles/constant";
//Actions
import { setPartyData, setMemberLevel } from "../actions/PartyActions";

//firebase
import firebase from "../utils/firebase";
import { useDispatch, useStore } from "react-redux";

const CreateScreen: React.FC = () => {
  //Create Party
  function createParty() {
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
    dispatch(setMemberLevel("LEADER"));
    setPartyCode(randomNumber);
  }

  //Leave Party
  function leaveParty() {
    dispatch(setPartyData(false));
    setPartyCode("");
  }

  const dispatch = useDispatch();
  const store = useStore();
  const partyStatus = store.getState().party.inParty;

  const [partyCode, setPartyCode] = useState("");
  const [partyName, setPartyName] = useState("");

  console.log(partyStatus);

  return (
    <View style={[styles.container]}>
      <TextInput
        style={styles.textInput}
        value={partyName}
        onChangeText={(name) => setPartyName(name)}
      ></TextInput>
      {!partyStatus ? (
        <Button mode="contained" style={styles.button} onPress={createParty}>
          Create Party
        </Button>
      ) : (
        <Button mode="contained" style={styles.button} onPress={leaveParty}>
          Leave Party
        </Button>
      )}

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
    alignSelf: "center",
    marginTop: 100,
  },
});

export default CreateScreen;
