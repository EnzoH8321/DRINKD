import React, { useEffect, useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
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
type TopChoicesInterface = {
  first?: string | [string, number];
  second?: string | [string, number];
  third?: string | [string, number];
};
//
const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState({});
  const [topChoicesObject, setTopChoicesObject] = useState<TopChoicesInterface>(
    {}
  );
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);

  function getTopScorers() {
    if (!choicesObject) {
      return Alert.alert("nothing found");
    }

    const entries: EntriesInterface = Object.entries(choicesObject);

    const preferredChoices: PrefInterface = {};

    let sortable = null;

    for (const [, value] of entries) {
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

    console.log(sortable);

    setTopChoicesObject({
      first: sortable[0] ? [sortable[0][0], sortable[0][1]] : "none",
      second: sortable[1] ? [sortable[1][0], sortable[1][1]] : "none",
      third: sortable[2] ? [sortable[2][0], sortable[2][1]] : "none",
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
    <View style={override.choiceContainer}>
      <View style={override.choiceDataContainer}>
        <MiniCardComponent
          index={1}
          name={topChoicesObject.first ? topChoicesObject.first[0] : "none"}
          number={topChoicesObject.first ? topChoicesObject.first[1] : 0}
        />
        <MiniCardComponent
          index={2}
          name={topChoicesObject.second ? topChoicesObject.second[0] : "none"}
          number={topChoicesObject.second ? topChoicesObject.second[1] : 0}
        />
        <MiniCardComponent
          index={3}
          name={topChoicesObject.third ? topChoicesObject.third[0] : "none"}
          number={topChoicesObject.third ? topChoicesObject.third[1] : 0}
        />
        <Button
          mode="contained"
          onPress={getTopScorers}
          style={override.button}
        >
          Who Won?
        </Button>
      </View>
    </View>
  );
};

const override = StyleSheet.create({
  choiceContainer: {
    ...styles.container,
  },
  choiceDataContainer: {
    ...styles.dataContainer,
  },
  button: {
    marginTop: styles.button.marginTop,
    width: styles.button.width,
    alignSelf: styles.button.alignSelf,
    backgroundColor: styles.colorPrimary.backgroundColor,
  },
});

export default TopChoicesScreen;
