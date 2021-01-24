import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import fetchBusiness from "../api/YelpApi";
import axios from "axios";
import styles from "../styles/constant";
//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";
import BottomSheet from "@gorhom/bottom-sheet";
import { Paragraph, Button } from "react-native-paper";

import Carousel from "react-native-snap-carousel";
//Actions
import { setApiData } from "../actions/APIActions";
//Types
import { ApiSearch } from "../types/types";

//Interface
type Item = {
  item: ApiSearch;
};

const HomeScreen: React.FC = () => {
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

  //use dataArray[index] to find current card

  const [dataArray, setDataArray] = useState<ApiSearch[] | null>();
  const [cardDetail, setCardDetails] = useState();
  const [index, setIndex] = useState<number>(0);

  const refCarousel = React.useRef(null);

  // Calls General Yelp Api
  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const data = await fetchBusiness();
        dispatch(setApiData(data));
        setDataArray(data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
              onBeforeSnapToItem={(index) => setIndex(index)}
            />
          </View>
          <Button
            onPress={() => fetchBarDetails(dataArray[index].id)}
            style={styles.homeButton}
            mode="contained"
          >
            Get more info
          </Button>
          <BottomSheet snapPoints={[150, 700]}>
            {CustomSheet(dataArray[index], cardDetail)}
          </BottomSheet>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
