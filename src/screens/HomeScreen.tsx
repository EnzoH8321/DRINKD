import React, { useEffect } from "react";
import { View } from "react-native";

import fetchAPI from "../api/YelpApi";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "../styles/constant";
import { Paragraph } from "react-native-paper";

//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";
import { useDispatch } from "react-redux";

//Actions
import { setApiData } from "../actions/APIActions";

//State
import store from "../store/store";

const HomeScreen = () => {
  const dispatch = useDispatch();

  // Calls API
  useEffect(() => {
    // the parenth below is syntax for => function(){...}
    (async () => {
      const data = await fetchAPI();
      dispatch(setApiData(data));
      console.log(store.getState().establishment.establishmentList);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <CardComponent />

      <BottomSheet
        snapPoints={[200, 500]}
        borderRadius={10}
        renderContent={CustomSheet}
      ></BottomSheet>

      <Paragraph> Hello</Paragraph>
    </View>
  );
};

export default HomeScreen;
