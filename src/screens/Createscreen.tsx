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

  const textRef = React.useRef(null);

  const override = StyleSheet.create({
    view: {
      alignItems: "center",
    },
    screenContainer: {
      ...styles.container,
      marginTop: "30%",
    },

    screenButton: {
      ...styles.button,
      ...styles.shadow,
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
    memberHeadline: {
      alignSelf: "center",
    },
    memberHeadlineView: {
      marginTop: "50%",
    },
    textInput: {
      color: "green",
    },
  });

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
            <View style={override.memberHeadlineView}>
              <Headline style={override.memberHeadline}>
                Please Leave your party first
              </Headline>
            </View>
          </View>
        );

      default:
        return (
          <View style={override.screenContainer}>
            <View>
              <Headline style={override.headline}>
                Create Your Party Below
              </Headline>
              <TextInput
                ref={textRef}
                value={partyName}
                onChangeText={(name) => setPartyName(name)}
                label="Name your party here"
                // onFocus={() => {
                //   textRef.current.props.theme.colors.primary =
                //     styles.colorPrimary.backgroundColor;
                // }}
                theme={{
                  colors: { primary: styles.colorPrimary.backgroundColor },
                }}
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

export default CreateScreen;
