import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Easing,
  Animated,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import styles from "../styles/constant";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import MiniCardComponent from "../components/MiniCardComponent";
import MiniCardComponentBack from "../components/MiniCardComponentBack";
//Firebase
import firebase from "../utils/firebase";
//Components
import { Button } from "react-native-paper";

//Types
type TopChoicesType = {
  first: {
    name: string;
    score: number;
    url: string;
  };
  second: {
    name: string;
    score: number;
    url: string;
  };
  third: {
    name: string;
    score: number;
    url: string;
  };
};

type TestObjectType = {
  [key: string]: {
    score: number;
    url: string;
  };
};

type TempObjectType = {
  [key: string]: [number, string];
};

type SortableType = [string, [number, string]][] | null;
type TempArrayType = [string, number, string][];
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

  //Animation
  const animatedValue: Animated.Value = useRef(new Animated.Value(0)).current;
  let defaultValue = 0;

  //Sets the default value to whatever the animater value is. This lets the JS engine have access to the animated value
  animatedValue.addListener(({ value }: { value: number }) => {
    defaultValue = value;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [
      {
        rotateX: frontInterpolate,
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateX: backInterpolate,
      },
    ],
  };

  function flipCard() {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 360,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  //

  //Gets the three top scorers
  function getTopScorers() {
    flipCard();
    if (!choicesObject) {
      return Alert.alert("Not in a party");
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

    //Takes the temporary array and loops through it, creating a temporary object
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

    //the sortable value takes the tempArray object and transforms it to an array
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
      (async () => {
        //Find the correct parties object in the db
        const firebaseData = await firebase
          .database()
          .ref(`parties/${partyId}`);

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

    choiceContainer: {
      ...styles.container,
      flexDirection: "column",
    },
    choiceDataContainer: {
      ...styles.dataContainer,
      alignItems: "center",
    },
    button: {
      marginTop: styles.button.marginTop,
      width: styles.button.width,
      alignSelf: styles.button.alignSelf,
      backgroundColor: styles.colorPrimary.backgroundColor,
      ...styles.shadow,
      ...styles.border,
    },
  });

  return (
    <View style={override.choiceContainer}>
      <View style={[override.choiceDataContainer]}>
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
