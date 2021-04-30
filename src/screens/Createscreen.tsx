import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { Headline, Button, TextInput } from "react-native-paper";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import styles from "../styles/constant";
//Actions
import {
  setPartyData,
  setMemberLevel,
  setPartyId,
  setUserName,
} from "../actions/PartyActions";
//Redux Components
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
//Firebase
import firebase from "../utils/firebase";
//Types
import { CreateScreenProps } from "../types/types";

const CreateScreen = ({ navigation }: CreateScreenProps): React.ReactNode => {
  const [partyName, setPartyName] = useState("");
  const [winningVoteAmount, setWinningVoteAmount] = useState("");
  const [expoTokenState, setExpoTokenState] = useState({
    expoPushToken: "",
  });
  const [inParty, setInParty] = useState(false);
  const dispatch = useDispatch();
  const memberLevel = useSelector(
    (state: RootState) => state.party.memberLevel
  );
  const partyURL = useSelector((state: RootState) => state.party.partyURL);
  const partyId = useSelector((state: RootState) => state.party.partyId);

  //References text input
  const textRef = React.useRef(null);

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
        partyMaxVotes: winningVoteAmount,
        notificationSent: false,
        topBars: {
          [userNameGenerator]: "",
        },
      });

    dispatch(setPartyData(true));
    dispatch(setMemberLevel("LEADER"));
    dispatch(setPartyId(randomNumber));
    dispatch(setUserName(userNameGenerator));
    setInParty(true);
    navigation.navigate("Home");
  }

  useEffect(() => {
    (async () => {
      if (Constants.isDevice) {
        const {
          status: existingStatus,
        } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;

        setExpoTokenState({ expoPushToken: token });
        firebase.database().ref(`parties/${partyId}`).update({
          expoToken: token,
        });
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    })();
  }, [partyId]);

  //Leave Party function
  function leaveParty() {
    if (memberLevel === "MEMBER") {
      return Alert.alert("You must be the party leader to delete the party");
    }

    //Removes "session" from DB
    firebase.database().ref(`parties/${partyId}`).remove();

    dispatch(setPartyData(false));
    dispatch(setMemberLevel(""));
    dispatch(setPartyId(""));
    setPartyName("");
    setWinningVoteAmount("");
    setInParty(false);
  }

  //Styles
  const override = StyleSheet.create({
    view: {
      alignItems: "center",
    },
    screenContainer: {
      ...styles.container,
    },

    screenButton: {
      ...styles.button,
      ...styles.shadow,
      ...styles.border,
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
                theme={{
                  colors: { primary: styles.colorPrimary.backgroundColor },
                }}
              ></TextInput>
              <TextInput
                label="Set winning vote amount"
                theme={{
                  colors: { primary: styles.colorPrimary.backgroundColor },
                }}
                keyboardType="numeric"
                onChangeText={(value) => setWinningVoteAmount(value)}
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
                  Party Name is {partyName}
                </Headline>
                <Headline style={override.createHeadline}>
                  The winning vote amount is {winningVoteAmount}
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
