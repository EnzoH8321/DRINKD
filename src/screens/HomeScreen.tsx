import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useStore } from "react-redux";
import fetchBusiness from "../api/YelpApi";
import axios from "axios";
import * as Location from "expo-location";
import styles from "../styles/constant";
import Icon from "react-native-vector-icons/FontAwesome";
//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import { Paragraph, Button } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
//Actions
import { setBarListData } from "../actions/APIActions";
import { setPartyURL } from "../actions/PartyActions";
//Types
import { ApiSearch } from "../types/types";
//Firebase
import firebase from "../utils/firebase";

//Interface
type Item = {
  item: ApiSearch;
};

const HomeScreen: React.FC = ({ route, navigation }) => {
  //Calls specific business using current card ID
  async function fetchBarDetails(id: string) {
    const data = await axios(`https://api.yelp.com/v3/businesses/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
      },
    });

    setCardDetails(data.data);
  }

  const dispatch = useDispatch();
  const store = useStore();
  const [dataArray, setDataArray] = useState<ApiSearch[] | null>();
  const [cardDetail, setCardDetails] = useState();
  const [index, setIndex] = useState<number>(0);
  const [pointValue, setPointValue] = useState(0);

  const refCarousel = React.useRef(null);
  const currentPartyStatus = route.params.showStars;
  const currentPartyId = store.getState().party.partyId;

  // Calls General Yelp Api
  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          alert("Permission to access denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const locationLat = location.coords.latitude.toString();
        const locationLong = location.coords.longitude.toString();
        const url = `https://api.yelp.com/v3/businesses/search?categories=bars&latitude=${locationLat}&longitude=${locationLong}&limit=10`;

        const data = await fetchBusiness(url);
        dispatch(setBarListData(data));
        dispatch(setPartyURL(url));
        setDataArray(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Submit score to DB
  function submitStarScores() {
    const currentCard = dataArray[index].name;
    const finalScore = pointValue;
    firebase
      .database()
      .ref(`parties/${currentPartyId}/topBars`)
      .update({
        [currentCard]: finalScore,
      });
  }

  return (
    <View style={styles.container}>
      {!dataArray ? (
        <Paragraph>Not Loaded Yet</Paragraph>
      ) : (
        <>
          <View style={styles.carousel}>
            <Carousel
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
            />
          </View>
          <Button
            onPress={() => fetchBarDetails(dataArray[index].id)}
            style={styles.homeButton}
            mode="contained"
          >
            Get more info
          </Button>
          {currentPartyStatus ? (
            <>
              <View style={override.starView}>
                <TouchableOpacity onPress={() => setPointValue(1)}>
                  <Icon
                    name="star"
                    style={{
                      color: pointValue >= 1 ? "gold" : "black",
                      fontSize: 32,
                    }}
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPointValue(2)}>
                  <Icon
                    name="star"
                    style={{
                      color: pointValue >= 2 ? "gold" : "black",
                      fontSize: 32,
                    }}
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPointValue(3)}>
                  <Icon
                    name="star"
                    style={{
                      color: pointValue >= 3 ? "gold" : "black",
                      fontSize: 32,
                    }}
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPointValue(4)}>
                  <Icon
                    name="star"
                    style={{
                      color: pointValue >= 4 ? "gold" : "black",
                      fontSize: 32,
                    }}
                  ></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPointValue(5)}>
                  <Icon
                    name="star"
                    style={{
                      color: pointValue >= 5 ? "gold" : "black",
                      fontSize: 32,
                    }}
                  ></Icon>
                </TouchableOpacity>
              </View>
              <View style={override.starViewButton}>
                <Button mode="contained" onPress={submitStarScores}>
                  Submit
                </Button>
              </View>
            </>
          ) : (
            <View></View>
          )}
          <BottomSheet snapPoints={[150, 700]}>
            {CustomSheet(dataArray[index], cardDetail)}
          </BottomSheet>
        </>
      )}
    </View>
  );
};

const override = StyleSheet.create({
  starView: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  starStyles: {
    fontSize: 32,
  },
  starViewButton: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "center",
  },
});

export default HomeScreen;
