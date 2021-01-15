import React, { useEffect } from "react";
import { View } from "react-native";
import fetchAPI from "../api/YelpApi";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "../styles/constant";

//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";

const HomeScreen = () => {
  // Calls API
  useEffect(() => {
    // the parenth below is syntax for => function(){...}
    (async () => {
      await fetchAPI();
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
    </View>
  );
};

export default HomeScreen;
