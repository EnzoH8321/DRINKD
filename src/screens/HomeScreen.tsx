import React from "react";
import { View } from "react-native";
import { Text, List } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "../styles/constant";

//Components
import CardComponent from "../components/CardComponent";
import CustomSheet from "../components/BottomSheetComponent";

const HomeScreen = () => {
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
