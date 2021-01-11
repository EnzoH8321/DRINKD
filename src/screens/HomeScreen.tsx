import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
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
      <Text>Swipe down to close</Text>
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
        snapPoints={[500, 0]}
        initialSnap={0}
        borderRadius={10}
        renderContent={renderContent}
        renderHeader={renderHeader}
      ></BottomSheet>
    </View>
  );
};

export default HomeScreen;
