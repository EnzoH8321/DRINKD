import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, Button, TextInput } from "react-native-paper";
import styles from "../styles/constant";
//Actions
import {
  setPartyData,
  setMemberLevel,
  setPartyId,
  setUserName,
} from "../actions/PartyActions";

//firebase
import firebase from "../utils/firebase";
import { useDispatch, useStore } from "react-redux";

const CreateScreen: React.FC = ({ navigation }) => {
  //Create Party
  function createParty() {
    if (!partyName) {
      return Alert.alert("You must name your party");
    }

    //Sets timestamp for when this is posted to the DB
    const creationTime = Date.now();

    const randomNumber = Math.floor(
      Math.pow(10, 8 - 1) + Math.random() * 9 * Math.pow(10, 8 - 1)
    ).toString();

    const userNameGenerator = Math.floor(
      Math.pow(10, 5 - 1) + Math.random() * 9 * Math.pow(10, 5 - 1)
    ).toString();

    firebase
      .database()
      .ref(`parties/${randomNumber}`)
      .set({
        partyId: randomNumber,
        partyTimestamp: creationTime,
        partyName: partyName,
        partyURL: partyURL,
        topBars: {
          [userNameGenerator]: "",
        },
      });

    dispatch(setPartyData(true));
    dispatch(setMemberLevel("LEADER"));
    dispatch(setPartyId(randomNumber));
    dispatch(setUserName(userNameGenerator));
    setPartyCode(randomNumber);
    navigation.navigate("Home", { showStars: true });
  }

  //Leave Party
  function leaveParty() {
    //Removes "session" from DB
    firebase.database().ref(`parties/${partyCode}`).remove();

    dispatch(setPartyData(false));
    dispatch(setMemberLevel(""));

    setPartyCode("");

    navigation.navigate("Home", { showStars: false });
  }

  const dispatch = useDispatch();
  const store = useStore();
  const partyStatus = store.getState().party.inParty;
  const partyURL = store.getState().party.partyURL;

  const [partyCode, setPartyCode] = useState("");
  const [partyName, setPartyName] = useState("");

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
