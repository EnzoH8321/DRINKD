import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import styles from "../styles/constant";
//Firebase
import firebase from "../utils/firebase";
//Components
import MiniCardComponent from "../components/MiniCardComponent";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Button } from "react-native-paper";

const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState();
  const [topChoicesObject, setTopChoicesObject] = useState({});
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);

  function getTopScorers() {
    if (!choicesObject) {
      return Alert.alert("nothing found");
    }

    const entries = Object.entries(choicesObject);

    const preferredChoices = {};

    let sortable = null;

    for (const [key, value] of entries) {
      for (const property in value) {
        if (!preferredChoices[property]) {
          preferredChoices[property] = value[property];
        } else {
          preferredChoices[property] += value[property];
        }
      }
    }

    sortable = Object.entries(preferredChoices).sort((a, b) => a[1] - b[1]);

    // setTopChoicesObject(preferredChoices);
    console.log("sortable", sortable);
    console.log("preferred", preferredChoices);
  }

  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const firebaseData = await firebase
          .database()
          .ref(`parties/${partyId}`);

        firebaseData.on("value", (snapshot) => {
          const data = snapshot.val();

          if (!data) {
            return;
          }

          setChoicesObject(data.topBars);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [inParty]);

  return (
    <View style={styles.container}>
      <MiniCardComponent index={1} />
      <MiniCardComponent index={2} />
      <MiniCardComponent index={3} />
      <Button mode="contained" onPress={getTopScorers}>
        Who Won?
      </Button>
    </View>
  );
};

export default TopChoicesScreen;
