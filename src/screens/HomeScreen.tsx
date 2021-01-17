import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import fetchAPI from "../api/YelpApi";
import styles from "../styles/constant";
//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";
import BottomSheet from "reanimated-bottom-sheet";
import { Paragraph } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
//Actions
import { setApiData } from "../actions/APIActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const [dataArray, setDataArray] = useState();
  const [index, setIndex] = useState(0);
  const refCarousel = React.useRef(null);

  // Calls API
  useEffect(() => {
    // the parenth below is syntax for => function(){...}
    (async () => {
      const data = await fetchAPI();
      dispatch(setApiData(data));
      setDataArray(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {!dataArray ? (
        <Paragraph>Not Loaded Yet</Paragraph>
      ) : (
        <>
          <Carousel
            ref={refCarousel}
            data={dataArray}
            renderItem={({ item }) => {
              return <CardComponent businessData={item} />;
            }}
            itemWidth={400}
            sliderWidth={500}
            onBeforeSnapToItem={(index) => setIndex(index)}
          />

          <BottomSheet
            snapPoints={[200, 800]}
            borderRadius={10}
            renderContent={() => {
              return CustomSheet(dataArray[index]);
            }}
          ></BottomSheet>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
