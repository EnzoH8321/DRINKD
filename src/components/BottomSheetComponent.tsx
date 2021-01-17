import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { List, Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = (arrayObj) => {
  const { price, location, phone } = arrayObj;
  const [screenType, setScreenType] = useState("phone");

  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View style={styles.iconList}>
        <Pressable onPress={() => setScreenType("phone")}>
          <List.Icon icon="phone" />
        </Pressable>
        <Pressable onPress={() => setScreenType("food")}>
          <List.Icon icon="food" />
        </Pressable>
        <Pressable onPress={() => setScreenType("map")}>
          <List.Icon icon="map" />
        </Pressable>
      </View>
      <View>
        <Title>{arrayObj.name}</Title>
        <Paragraph>
          {location.address1} {location.address2}
          {"\n"}
          {location.city} {location.state} {location.zip_code}
          {"\n"}
          {phone}
        </Paragraph>
      </View>
    </View>
  );
};

export default CustomSheet;
