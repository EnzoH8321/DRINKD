import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, TextInput, Button } from "react-native-paper";
import styles from "../styles/constant";

import {
  setPartyData,
  setMemberLevel,
  setPartyId,
} from "../actions/PartyActions";

//firebase
import firebase from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";

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

      //Sets party status to true
      dispatch(setPartyData(true));
      //Sets global member level to member
      dispatch(setPartyId(data.partyId));
      dispatch(setMemberLevel("MEMBER"));
    });
  }

  const dispatch = useDispatch();
  const partyId = useSelector((state) => state.party.partyId);
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

      {!partyId ? (
        <Headline style={override.statusText}>You are not in a party</Headline>
      ) : (
        <Headline style={override.statusText}>
          Your party code is {partyId}
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
