import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import fetchBusiness from "../api/YelpApi";

import * as Location from "expo-location";
import styles from "../styles/constant";
import Icon from "react-native-vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
//Components
import CardComponent from "../components/CardComponent";

import { Paragraph, Button, Headline } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
//Actions
import { setBarListData } from "../actions/APIActions";
import { setPartyURL } from "../actions/PartyActions";
//Types
import { ApiSearch, HomeScreenNavProp } from "../types/types";
//
import { RootState } from "../reducers";
//Firebase
import firebase from "../utils/firebase";

//Interface
type Item = {
  item: ApiSearch;
};

type Props = {
  navigation: HomeScreenNavProp;
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

  // //Calls specific business using current card ID
  // async function fetchBarDetails(id: string) {
  //   const data = await axios(`https://api.yelp.com/v3/businesses/${id}`, {
  //     method: "GET",
  //     headers: {
  //       Authorization:
  //         "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
  //     },
  //   });

  //   setTransactionArray(data.data.transactions);
  //   setDetailedInfo(data.data);
  //   setPhotoArray(data.data.photos);
  // }

  // Calls General Yelp Api
  useEffect(() => {
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
    const finalScore = pointValue;

    firebase
      .database()
      .ref(`parties/${currentPartyId}/topBars/${userName}`)
      .update({
        [currentCard]: finalScore,
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
      marginTop: "5%",
    },
    carousel: {
      height: !currentPartyStatus ? "90%" : "73%",
      marginTop: "2%",
      marginLeft: "2%",
    },
    homeContainer: {
      zIndex: -1,
    },
    headlineView: {
      marginTop: "10%",
      justifyContent: "space-around",
      display: "flex",
      flexDirection: "row",
    },
    starContainer: {
      marginTop: "5%",
    },
    starView: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    starStyles: {
      fontSize: 32,
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

      //For Android due to it not propery supporting z-index
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
      fontSize: 42,
    },
  });

  return (
    <View style={override.container}>
      {!dataArray ? (
        <Paragraph>Not Loaded Yet</Paragraph>
      ) : (
        <>
          <View style={override.homeContainer}>
            <View style={override.headlineView}>
              <Headline>
                Party Code: {currentPartyId ? currentPartyId : ""}
              </Headline>
              <Button
                mode="contained"
                style={override.button}
                onPress={() => {
                  if (dataArray) {
                    WebBrowser.openBrowserAsync(`${dataArray[index].url}`);
                  }
                }}
              >
                Learn More
              </Button>
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
              <View style={override.starContainer}>
                <View style={override.starView}>
                  <TouchableOpacity onPress={() => firstStarLogic()}>
                    <Icon
                      name="thumbs-up-outline"
                      style={{
                        color:
                          pointValue >= 1
                            ? styles.colorTertiary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(2)}>
                    <Icon
                      name="thumbs-up-outline"
                      style={{
                        color:
                          pointValue >= 2
                            ? styles.colorTertiary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(3)}>
                    <Icon
                      name="thumbs-up-outline"
                      style={{
                        color:
                          pointValue >= 3
                            ? styles.colorTertiary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(4)}>
                    <Icon
                      name="thumbs-up-outline"
                      style={{
                        color:
                          pointValue >= 4
                            ? styles.colorTertiary.backgroundColor
                            : "black",
                        fontSize: override.icon.fontSize,
                      }}
                    ></Icon>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setPointValue(5)}>
                    <Icon
                      name="thumbs-up-outline"
                      style={{
                        color:
                          pointValue >= 5
                            ? styles.colorTertiary.backgroundColor
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
