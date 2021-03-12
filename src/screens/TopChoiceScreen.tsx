import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
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
  string?: {
    score: number;
    url: string;
  };
};
type EntriesInterface = [
  string,
  {
    score: number;
    url: string;
  }
][];
type TopChoicesInterface = {
  first?: [string, { score: number; url: string }];
  second?: [string, { score: number; url: string }];
  third?: [string, { score: number; url: string }];
};
//
const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState({});
  const [topChoicesObject, setTopChoicesObject] = useState<TopChoicesInterface>(
    {}
  );
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);

  //Gets the three top scorers
  function getTopScorers() {
    if (!choicesObject) {
      return Alert.alert("nothing found");
    }

    const entries: any = Object.entries(choicesObject);

    const preferredChoices: any = {};

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
      .sort((a, b) => a[1].score - b[1].score)
      .reverse();

    setTopChoicesObject({
      first: sortable[0] ? [sortable[0][0], sortable[0][1]] : "",
      second: sortable[1] ? [sortable[1][0], sortable[1][1]] : "",
      third: sortable[2] ? [sortable[2][0], sortable[2][1]] : "",
    });

    console.log(topChoicesObject);
  }
  //Grabs the bar choices from the Firebase DB
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
          //Turns off firebase listener when you leave a party
          if (!inParty) {
            firebaseData.off();
          }

          setChoicesObject(data.topBars);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [inParty, partyId]);

  return (
    <View style={override.choiceContainer}>
      <View style={override.choiceDataContainer}>
        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(
              `${topChoicesObject.first ? topChoicesObject.first[1].url : ""}`
            )
          }
        >
          <MiniCardComponent
            index={1}
            name={topChoicesObject.first ? topChoicesObject.first[0] : ""}
            number={
              topChoicesObject.first ? topChoicesObject.first[1].score : 0
            }
            iconColor="gold"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(
              `${topChoicesObject.second ? topChoicesObject.second[1].url : ""}`
            )
          }
        >
          <MiniCardComponent
            index={2}
            name={topChoicesObject.second ? topChoicesObject.second[0] : ""}
            number={
              topChoicesObject.second ? topChoicesObject.second[1].score : 0
            }
            url={topChoicesObject.second ? topChoicesObject.second[1].url : ""}
            iconColor="silver"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            WebBrowser.openBrowserAsync(
              `${topChoicesObject.third ? topChoicesObject.third[1].url : ""}`
            )
          }
        >
          <MiniCardComponent
            index={3}
            name={topChoicesObject.third ? topChoicesObject.third[0] : ""}
            number={
              topChoicesObject.third ? topChoicesObject.third[1].score : 0
            }
            iconColor="#CD7F32"
          />
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={getTopScorers}
          style={override.button}
        >
          Find Winner
        </Button>
      </View>
    </View>
  );
};

const override = StyleSheet.create({
  choiceContainer: {
    ...styles.container,
    marginTop: "30%",
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
