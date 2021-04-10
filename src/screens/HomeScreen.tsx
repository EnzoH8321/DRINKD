import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Easing,
  Dimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import styles from "../styles/constant";
//Expo
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
//Api
import fetchBusiness from "../api/YelpApi";
//Components
import CardComponent from "../components/CardComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Headline } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { useDispatch, useSelector } from "react-redux";
//Redux Components
import { setBarListData } from "../actions/APIActions";
import { setPartyURL } from "../actions/PartyActions";
import { RootState } from "../reducers";
//Types
import { ApiSearch } from "../types/types";
//Firebase
import firebase from "../utils/firebase";
//Types
type Item = {
  item: ApiSearch;
};

const HomeScreen = (): React.ReactNode => {
  const dispatch = useDispatch();
  const [dataArray, setDataArray] = useState<ApiSearch[]>();
  const [index, setIndex] = useState(0);
  const [pointValue, setPointValue] = useState(0);
  const [firstStar, setFirstStar] = useState(false);
  const refCarousel = React.useRef(null);
  const currentPartyStatus = useSelector(
    (state: RootState) => state.party.inParty
  );
  const yelpUrl = useSelector((state: RootState) => state.party.partyURL);
  const memberLevel = useSelector(
    (state: RootState) => state.party.memberLevel
  );
  const currentPartyId = useSelector((state: RootState) => state.party.partyId);
  const userName = useSelector((state: RootState) => state.party.userName);
  const inParty = useSelector((state: RootState) => state.party.inParty);
  //Get window dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  //Animation Code
  const state1 = useRef(new Animated.Value(0)).current;
  const state2 = useRef(new Animated.Value(0)).current;
  const state3 = useRef(new Animated.Value(0)).current;
  const state4 = useRef(new Animated.Value(0)).current;
  const state5 = useRef(new Animated.Value(0)).current;

  const startAnimation = (stateVal: Animated.Value<number>) => {
    Animated.timing(stateVal, {
      toValue: 360,
      duration: 100,
      easing: Easing.linear,
    }).start();

    stateVal.setValue(0);
  };

  const rotateInterpolate1 = state1.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  const rotateInterpolate2 = state2.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  const rotateInterpolate3 = state3.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  const rotateInterpolate4 = state4.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  const rotateInterpolate5 = state5.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "-360deg"],
  });
  //
  // Calls General Yelp Api
  useEffect(() => {
    //When there is not data to present, use splash screen
    if (!dataArray) {
      SplashScreen.preventAutoHideAsync();
    }

    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const { status } = await Location.requestPermissionsAsync();
        const location = await Location.getCurrentPositionAsync();
        const locationLat = location.coords.latitude.toString();
        const locationLong = location.coords.longitude.toString();
        let url = "";

        if (status !== "granted") {
          alert("Permission to access denied");
          return;
        }

        if (memberLevel === "MEMBER" && inParty) {
          url = yelpUrl;
        } else {
          url = `https://api.yelp.com/v3/businesses/search?categories=bars&latitude=${locationLat}&longitude=${locationLong}&limit=10`;
        }

        const data = await fetchBusiness(url);

        dispatch(setBarListData(data));
        dispatch(setPartyURL(url));
        setDataArray(data);
        //After data has been called, remove splash screen
        SplashScreen.hideAsync();
      })();
    } catch (error) {
      console.log(error);
    }
  }, [yelpUrl]);

  //Star Logic

  function starLogic(starPosition: number) {
    switch (starPosition) {
      case 1:
        if (!firstStar) {
          setFirstStar(true);
          setPointValue(1);
          startAnimation(state1);
        } else {
          setPointValue(0);
          setFirstStar(false);
        }
        break;
      case 2:
        setPointValue(2);

        startAnimation(state2);

        break;
      case 3:
        setPointValue(3);
        startAnimation(state3);
        break;
      case 4:
        setPointValue(4);
        startAnimation(state4);
        break;
      case 5:
        setPointValue(5);
        startAnimation(state5);
        break;
    }
  }

  //Submit score to DB
  function submitStarScores() {
    if (!dataArray) {
      return Alert.alert("No data found");
    }

    const currentCard = dataArray[index].name;
    const currentUrl = dataArray[index].url;
    const finalScore = pointValue;

    //Find current eatery and updates the score if needed
    firebase
      .database()
      .ref(`parties/${currentPartyId}/topBars/${userName}`)
      .update({
        [currentCard]: {
          score: finalScore,
          url: currentUrl,
        },
      });
  }

  //Styles
  const override = StyleSheet.create({
    button: {
      width: "35%",
      backgroundColor: styles.colorPrimary.backgroundColor,
      ...styles.shadow,
    },
    container: {
      ...styles.container,
    },
    carousel: {
      height: !currentPartyStatus ? "94%" : "77%",
      marginTop: "2%",
      marginLeft: "2%",
    },
    homeContainer: {
      zIndex: -1,
    },
    headlineView: {
      // marginTop: "10%",
      justifyContent: "space-around",
      display: "flex",
      flexDirection: "row",
    },

    starView: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: "3%",
    },
    starStyles: {
      fontSize: styles.icon.fontSize,
    },
    starViewButton: {
      marginTop: "5%",
      alignSelf: styles.button.alignSelf,
    },
    infoButton: {
      marginTop: "5%",
      width: styles.button.width,
      alignSelf: styles.button.alignSelf,
      backgroundColor: styles.colorPrimary.backgroundColor,
    },
    submitButton: {
      backgroundColor: styles.colorPrimary.backgroundColor,
      ...styles.shadow,
    },
    iconContainer: {
      marginLeft: "2%",
      marginTop: "2%",
    },
    icon: {
      //For stars
      fontSize: 42,
      ...styles.shadow,
    },
  });

  return (
    <View style={override.container}>
      {!dataArray ? (
        <></>
      ) : (
        <>
          <View style={override.homeContainer}>
            <View style={override.headlineView}>
              <Headline>
                Party Code: {currentPartyId ? currentPartyId : ""}
              </Headline>
            </View>
            <View style={override.carousel}>
              <Carousel
                activeSlideAlignment="start"
                ref={refCarousel}
                data={dataArray}
                renderItem={({ item }: Item) => {
                  return <CardComponent barData={item} />;
                }}
                itemWidth={400}
                sliderWidth={500}
                onBeforeSnapToItem={(index) => {
                  setIndex(index);
                  //Reset's point value
                  setPointValue(0);
                }}
                layout="tinder"
              />
            </View>

            {currentPartyStatus ? (
              <View>
                <View style={override.starView}>
                  <Animated.View
                    style={[{ transform: [{ rotate: rotateInterpolate1 }] }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        starLogic(1);
                      }}
                    >
                      <Icon
                        name="star"
                        style={{
                          ...override.icon,
                          color:
                            pointValue >= 1
                              ? styles.colorPrimary.backgroundColor
                              : "black",
                          shadowColor:
                            pointValue >= 1
                              ? styles.colorPrimary.backgroundColor
                              : "#000000",
                        }}
                      ></Icon>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[{ transform: [{ rotate: rotateInterpolate2 }] }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        starLogic(2);
                      }}
                    >
                      <Icon
                        name="star"
                        style={{
                          ...override.icon,
                          color:
                            pointValue >= 2
                              ? styles.colorPrimary.backgroundColor
                              : "black",
                          shadowColor:
                            pointValue >= 2
                              ? styles.colorPrimary.backgroundColor
                              : "#000000",
                        }}
                      ></Icon>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[{ transform: [{ rotate: rotateInterpolate3 }] }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        starLogic(3);
                      }}
                    >
                      <Icon
                        name="star"
                        style={{
                          ...override.icon,
                          color:
                            pointValue >= 3
                              ? styles.colorPrimary.backgroundColor
                              : "black",
                          shadowColor:
                            pointValue >= 3
                              ? styles.colorPrimary.backgroundColor
                              : "#000000",
                        }}
                      ></Icon>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[{ transform: [{ rotate: rotateInterpolate4 }] }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        starLogic(4);
                      }}
                    >
                      <Icon
                        name="star"
                        style={{
                          ...override.icon,
                          color:
                            pointValue >= 4
                              ? styles.colorPrimary.backgroundColor
                              : "black",
                          shadowColor:
                            pointValue >= 4
                              ? styles.colorPrimary.backgroundColor
                              : "#000000",
                        }}
                      ></Icon>
                    </TouchableOpacity>
                  </Animated.View>
                  <Animated.View
                    style={[{ transform: [{ rotate: rotateInterpolate5 }] }]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        starLogic(5);
                      }}
                    >
                      <Icon
                        name="star"
                        style={{
                          ...override.icon,
                          color:
                            pointValue >= 5
                              ? styles.colorPrimary.backgroundColor
                              : "black",
                          shadowColor:
                            pointValue >= 5
                              ? styles.colorPrimary.backgroundColor
                              : "#000000",
                        }}
                      ></Icon>
                    </TouchableOpacity>
                  </Animated.View>
                </View>
                <View style={override.starViewButton}>
                  <Button
                    mode="contained"
                    onPress={submitStarScores}
                    style={override.submitButton}
                  >
                    Submit
                  </Button>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
