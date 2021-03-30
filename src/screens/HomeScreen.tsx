import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { RootState } from "../reducers";
import fetchBusiness from "../api/YelpApi";

import * as Location from "expo-location";
import styles from "../styles/constant";
import * as SplashScreen from "expo-splash-screen";

//Components
import CardComponent from "../components/CardComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { Button, Headline } from "react-native-paper";

//Actions
import { setBarListData } from "../actions/APIActions";
import { setPartyURL } from "../actions/PartyActions";
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

  //Toggle First Star
  function firstStarLogic() {
    if (!firstStar) {
      setFirstStar(true);
      setPointValue(1);
    } else {
      setPointValue(0);
      setFirstStar(false);
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
                  <TouchableOpacity onPress={() => firstStarLogic()}>
                    <Icon
                      name="star"
                      style={{
                        color:
                          pointValue >= 1
                            ? styles.colorPrimary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(2)}>
                    <Icon
                      name="star"
                      style={{
                        color:
                          pointValue >= 2
                            ? styles.colorPrimary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(3)}>
                    <Icon
                      name="star"
                      style={{
                        color:
                          pointValue >= 3
                            ? styles.colorPrimary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(4)}>
                    <Icon
                      name="star"
                      style={{
                        color:
                          pointValue >= 4
                            ? styles.colorPrimary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(5)}>
                    <Icon
                      name="star"
                      style={{
                        color:
                          pointValue >= 5
                            ? styles.colorPrimary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
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
