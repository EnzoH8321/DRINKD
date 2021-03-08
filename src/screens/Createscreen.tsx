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
import { useDispatch, useSelector } from "react-redux";
//Types
import { RootState } from "../reducers";
import { CreateScreenProps } from "../types/types";

const CreateScreen = ({ navigation }: CreateScreenProps): React.ReactNode => {
  const dispatch = useDispatch();
  const memberLevel = useSelector(
    (state: RootState) => state.party.memberLevel
  );
  const partyURL = useSelector((state: RootState) => state.party.partyURL);
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const [partyName, setPartyName] = useState("");

  //Create Party func
  function createParty() {
    if (!partyName) {
      return Alert.alert("You must name your party");
    }

    //Sets timestamp for when this is posted to the DB
    const creationTime = Date.now();

    const randomNumber = Math.floor(
      Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)
    ).toString();

    const userNameGenerator = Math.floor(
      Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)
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
    navigation.navigate("Home");
  }

  //Leave Party func
  function leaveParty() {
    if (memberLevel === "MEMBER") {
      return Alert.alert("You must be party leader to leave the party");
    }

    //Removes "session" from DB
    firebase.database().ref(`parties/${partyId}`).remove();

    dispatch(setPartyData(false));
    dispatch(setMemberLevel(""));
    dispatch(setPartyId(""));
  }

  function renderSwitch(param: string) {
    switch (param) {
      case "MEMBER":
        return (
          <View>
            <Headline>Please Leave your party first</Headline>
          </View>
        );

      default:
        return (
          <View style={override.screenContainer}>
            <View style={override.screenDataContainer}>
              <Headline style={override.headline}>
                Create Your Party Below
              </Headline>
              <TextInput
                style={override.textInput}
                value={partyName}
                onChangeText={(name) => setPartyName(name)}
                label="Name your party here"
              ></TextInput>
              {!memberLevel ? (
                <Button
                  mode="contained"
                  style={override.screenButton}
                  onPress={createParty}
                >
                  Create Party
                </Button>
              ) : (
                <Button
                  mode="contained"
                  style={override.screenButton}
                  onPress={leaveParty}
                >
                  Leave Party
                </Button>
              )}
              <View style={override.headlineView}>
                <Headline style={override.createHeadline}>
                  Party Code is {partyId}
                </Headline>
                <Headline style={override.createHeadline}>
                  Party Name is {partyId}
                </Headline>
              </View>
            </View>
          </View>
        );
    }
  }
  return renderSwitch(memberLevel);
};

const override = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  screenContainer: {
    ...styles.container,
    marginTop: "30%",
  },
  screenDataContainer: {},
  screenButton: {
    ...styles.button,
    backgroundColor: styles.colorPrimary.backgroundColor,
  },
  headline: {
    ...styles.headline,
  },
  headlineView: {
    marginTop: "10%",
  },
  createHeadline: {
    textAlign: "center",
  },
  textInput: {},
});

export default CreateScreen;
