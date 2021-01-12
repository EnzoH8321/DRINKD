import React from "react";
import { View } from "react-native";
import { Text, List } from "react-native-paper";
import BottomSheet from "reanimated-bottom-sheet";
import styles from "../styles/constant";

//Components
import CardComponent from "../components/CardComponent";

const HomeScreen = () => {
  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View style={styles.iconList}>
        <List.Icon icon="phone" />
        <List.Icon icon="food" />
        <List.Icon icon="map" />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View>
      <Text>Hello</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CardComponent />

      <BottomSheet
        snapPoints={[200, 500]}
        borderRadius={10}
        renderContent={renderContent}
      ></BottomSheet>
    </View>
  );
};

export default HomeScreen;
