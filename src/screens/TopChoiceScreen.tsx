import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import styles from "../styles/constant";
//Redux Components
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
//Components
import MiniCardComponent from "../components/MiniCardComponent";
import { Button, Headline } from "react-native-paper";
//Firebase
import firebase from "../utils/firebase";
//Types
import {
  TopChoicesType,
  TestObjectType,
  TempObjectType,
  SortableType,
  TempArrayType,
} from "../types/types";
//Functions
import { checkNetworkConnection } from "../utils/functions";

//
const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState({});
  const [topChoicesObject, setTopChoicesObject] = useState<TopChoicesType>({
    first: {
      name: "",
      score: 0,
      url: "",
    },
    second: {
      name: "",
      score: 0,
      url: "",
    },
    third: {
      name: "",
      score: 0,
      url: "",
    },
  });
  const partyId = useSelector((state: RootState) => state.party.partyId);
  const inParty = useSelector((state: RootState) => state.party.inParty);
  //Get window dimensions
  const windowHeight = Dimensions.get("window").height;
  const isSmallDisplay = windowHeight < 700;

  //Animation
  const animatedValue: Animated.Value = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateX: frontInterpolate,
      },
    ],
  };

  function flipCard() {
    animatedValue.setValue(0);
    // getTopScorers();
    Animated.spring(animatedValue, {
      toValue: 360,
      useNativeDriver: true,
      speed: 1,
      bounciness: 2,
    }).start();
  }
  //

  //Gets the three top scorers
  async function getTopScorers() {
    const networkStatus = await checkNetworkConnection();

    if (!networkStatus) {
      return Alert.alert("Please Connect to the Internet");
    }

    try {
      // the parenth below is syntax for => function(){...}
      (() => {
        //Find the correct parties object in the db
        const firebaseData = firebase.database().ref(`parties/${partyId}`);

        firebaseData.on("value", (snapshot) => {
          const data = snapshot.val();

          //Turns off firebase listener when you leave a party. Also sets objects empty when you are not in a party (this clears the mini card component)
          if (!inParty || !data) {
            firebaseData.off();
            //Resets the topChoicesObject
            setTopChoicesObject({
              first: {
                name: "",
                score: 0,
                url: "",
              },
              second: {
                name: "",
                score: 0,
                url: "",
              },
              third: {
                name: "",
                score: 0,
                url: "",
              },
            });
            setChoicesObject({});
            return;
          }

          setChoicesObject(data.topBars);
        });
      })();
      flipCard();
      if (!choicesObject) {
        return Alert.alert("No Changes to the Scoreboard");
      }
    } catch (error) {
      console.log(error);
    }

    //Final Array that will hold all out sorted eateries and their url/scores
    let sortable: SortableType = null;

    const tempArray: TempArrayType = [];
    const tempObject: TempObjectType = {};

    //Cleans up incoming Array and removes unneeded nested elements. Pushes each element into a temporary array
    Object.entries(choicesObject).map((ele) => {
      const testObj: TestObjectType = ele[1];

      for (const property in testObj) {
        tempArray.push([
          property,
          testObj[property].score,
          testObj[property].url,
        ]);
      }

      return ele[1];
    });

    //Takes the temporary array and loops through it, uses the name/score,url as the properties of the temp object
    tempArray.forEach((ele: [string, number, string]) => {
      const currentName = ele[0];
      const currentScore = ele[1];
      const currentURL = ele[2];

      //Checks if the key value exists in the tempObject, if it doesnt add it. If it does, make sure you add the old score with the current score. This make sure duplicate scores are added
      if (!tempObject[currentName]) {
        tempObject[currentName] = [currentScore, currentURL];
      } else {
        const oldScore = tempObject[currentName][0];
        tempObject[currentName] = [oldScore + currentScore, currentURL];
      }
    });

    //The sortable value takes the tempArray object and transforms it to an array
    sortable = Object.entries(tempObject)
      .sort((a, b) => a[1][0] - b[1][0])
      .reverse();

    setTopChoicesObject({
      first: sortable[0]
        ? {
            name: sortable[0][0],
            score: sortable[0][1][0],
            url: sortable[0][1][1],
          }
        : {
            name: "",
            score: 0,
            url: "",
          },
      second: sortable[1]
        ? {
            name: sortable[1][0],
            score: sortable[1][1][0],
            url: sortable[1][1][1],
          }
        : {
            name: "",
            score: 0,
            url: "",
          },
      third: sortable[2]
        ? {
            name: sortable[2][0],
            score: sortable[2][1][0],
            url: sortable[2][1][1],
          }
        : {
            name: "",
            score: 0,
            url: "",
          },
    });
  }

  //Grabs the eatery choices from the Firebase DB
  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (() => {
        //Find the correct parties object in the db
        const firebaseData = firebase.database().ref(`parties/${partyId}`);

        firebaseData.on("value", (snapshot) => {
          const data = snapshot.val();

          //Turns off firebase listener when you leave a party. Also sets objects empty when you are not in a party (this clears the mini card component)
          if (!inParty || !data) {
            firebaseData.off();
            //Resets the topChoicesObject
            setTopChoicesObject({
              first: {
                name: "",
                score: 0,
                url: "",
              },
              second: {
                name: "",
                score: 0,
                url: "",
              },
              third: {
                name: "",
                score: 0,
                url: "",
              },
            });
            setChoicesObject({});
            return;
          }

          setChoicesObject(data.topBars);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [inParty, partyId]);

  //Styles
  const override = StyleSheet.create({
    animatedCardView: {
      alignItems: "center",
      backfaceVisibility: "hidden",
    },
    button: {
      marginTop: isSmallDisplay ? 0 : styles.button.marginTop,
      width: styles.button.width,
      alignSelf: styles.button.alignSelf,
      backgroundColor: styles.colorPrimary.backgroundColor,
      ...styles.shadow,
      ...styles.border,
    },
    choiceContainer: {
      ...styles.container,
      flexDirection: "column",
    },
    choiceDataContainer: {
      marginTop: "1%",
      alignItems: "center",
    },
    headline: {
      marginBottom: "5%",
    },
  });

  return (
    <View style={override.choiceContainer}>
      <View style={[override.choiceDataContainer]}>
        <Headline style={override.headline}>Points Needed to Win - </Headline>
        <Animated.View style={[frontAnimatedStyle, override.animatedCardView]}>
          <TouchableOpacity
            onPress={() => {
              if (!inParty || !topChoicesObject.first.url) {
                return;
              }
              try {
                WebBrowser.openBrowserAsync(
                  `${topChoicesObject.first ? topChoicesObject.first.url : ""}`
                );
              } catch (error) {
                Alert.alert("No Link Found ");
              }
            }}
          >
            <MiniCardComponent
              index={1}
              name={
                topChoicesObject.first && inParty
                  ? topChoicesObject.first.name
                  : ""
              }
              number={
                topChoicesObject.first && inParty
                  ? topChoicesObject.first.score
                  : 0
              }
              iconColor="gold"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[frontAnimatedStyle, override.animatedCardView]}>
          <TouchableOpacity
            onPress={() => {
              if (!inParty || !topChoicesObject.second) {
                return;
              }
              try {
                WebBrowser.openBrowserAsync(
                  `${
                    topChoicesObject.second ? topChoicesObject.second.url : ""
                  }`
                );
              } catch (err) {
                Alert.alert("No Link Found ");
              }
            }}
          >
            <MiniCardComponent
              index={2}
              name={
                topChoicesObject.second && inParty
                  ? topChoicesObject.second.name
                  : ""
              }
              number={
                topChoicesObject.second && inParty
                  ? topChoicesObject.second.score
                  : 0
              }
              iconColor="silver"
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[frontAnimatedStyle, override.animatedCardView]}>
          <TouchableOpacity
            onPress={() => {
              if (!inParty || !topChoicesObject.third) {
                return;
              }
              try {
                WebBrowser.openBrowserAsync(
                  `${topChoicesObject.third ? topChoicesObject.third.url : ""}`
                );
              } catch (error) {
                Alert.alert("No Link Found ");
              }
            }}
          >
            <MiniCardComponent
              index={3}
              name={
                topChoicesObject.third && inParty
                  ? topChoicesObject.third.name
                  : ""
              }
              number={
                topChoicesObject.third && inParty
                  ? topChoicesObject.third.score
                  : 0
              }
              iconColor="#CD7F32"
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <Button
        mode="contained"
        onPress={() => {
          getTopScorers();
        }}
        style={override.button}
      >
        Find Winner
      </Button>
    </View>
  );
};

export default TopChoicesScreen;
