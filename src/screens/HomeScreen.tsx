import React, { useEffect, useState } from "react";
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

  const [dataArray, setDataArray] = useState(null);

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
        <BottomSheet
          snapPoints={[200, 500]}
          borderRadius={10}
          renderContent={CustomSheet}
        ></BottomSheet>
      )}
    </View>
  );
};

export default HomeScreen;
