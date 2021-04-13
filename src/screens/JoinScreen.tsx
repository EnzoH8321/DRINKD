import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Headline, TextInput, Button } from "react-native-paper";
import styles from "../styles/constant";
//Redux Components
import { RootState } from "../reducers";
import { useDispatch, useSelector } from "react-redux";
import {
  setPartyData,
  setMemberLevel,
  setPartyId,
  setUserName,
  setPartyURL,
} from "../actions/PartyActions";
//Firebase
import firebase from "../utils/firebase";

//
const JoinScreen: React.FC = () => {
  const dispatch = useDispatch();
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);
  const userName = useSelector((state: RootState) => state.party.userName);
  const [textValue, setTextValue] = useState("");
  let userNameGenerator = "";

  //Gives the user a random name to use. If they already have one, they just use that.
  if (userName === "") {
    userNameGenerator = Math.floor(
      Math.pow(10, 5 - 1) + Math.random() * 9 * Math.pow(10, 5 - 1)
    ).toString();
  } else {
    userNameGenerator = userName;
  }

  //Join Party
  function joinParty() {
    const ref = firebase.database().ref(`parties/${textValue}`);

    console.log(textValue);

    ref.on("value", (snapshot) => {
      const data = snapshot.val();

      //Returns if data is not found
      if (data === null || textValue.length === 0) {
        return Alert.alert("No Party Found");
      }

      dispatch(setPartyData(true));
      dispatch(setPartyId(data.partyId));
      dispatch(setMemberLevel("MEMBER"));
      dispatch(setUserName(userNameGenerator));
      dispatch(setPartyURL(data.partyURL));
    });
  }

  //Leave Party function
  function leaveParty() {
    firebase.database().ref(`parties/${partyId}/topBars/${userName}/`).remove();
    dispatch(setPartyData(false));
    dispatch(setMemberLevel(""));
    dispatch(setPartyId(""));
    dispatch(setPartyURL(""));
  }

  //Styles
  const override = StyleSheet.create({
    joinContainer: {
      ...styles.container,
    },
    headline: {
      ...styles.headline,
    },
    imageView: {
      height: "100%",
      flex: 1,
    },
    statusText: {
      ...styles.headline,
      marginTop: "20%",
    },
    button: {
      ...styles.button,
      ...styles.shadow,
      ...styles.border,
      backgroundColor: styles.colorPrimary.backgroundColor,
    },
  });

  return (
    <View style={override.joinContainer}>
      <Headline style={override.headline}> Enter Party Code Below </Headline>
      <TextInput
        label="Enter party code here"
        value={textValue}
        onChangeText={(text) => setTextValue(text)}
        theme={{
          colors: { primary: styles.colorPrimary.backgroundColor },
        }}
      />
      {!inParty ? (
        <Button mode="contained" style={override.button} onPress={joinParty}>
          Go
        </Button>
      ) : (
        <Button mode="contained" style={override.button} onPress={leaveParty}>
          Leave Party
        </Button>
      )}

      {!partyId ? (
        <Headline style={override.statusText}>You are not in a party</Headline>
      ) : (
        <Headline style={override.statusText}>
          Your party code is {partyId}
        </Headline>
      )}
      <View style={override.imageView}></View>
    </View>
  );
};

export default JoinScreen;
