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
//Types
type PrefInterface = {
  [key: string]: number;
};
type EntriesInterface = [string, { [key: string]: number }][];

//
const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState({});
  const [topChoicesObject, setTopChoicesObject] = useState({});
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);

  console.log(topChoicesObject);

  function getTopScorers() {
    if (!choicesObject) {
      return Alert.alert("nothing found");
    }

    const entries: EntriesInterface = Object.entries(choicesObject);

    const preferredChoices: PrefInterface = {};

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

    sortable = Object.entries(preferredChoices)
      .sort((a, b) => a[1] - b[1])
      .reverse();

    setTopChoicesObject({
      first: sortable[0][0],
      second: sortable[1] ? sortable[1][0] : "none",
      third: sortable[2] ? sortable[2][0] : "none",
    });
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
      <MiniCardComponent index={1} name={topChoicesObject.first} />
      <MiniCardComponent index={2} name={topChoicesObject.second} />
      <MiniCardComponent index={3} name={topChoicesObject.third} />
      <Button mode="contained" onPress={getTopScorers}>
        Who Won?
      </Button>
    </View>
  );
};

export default TopChoicesScreen;
