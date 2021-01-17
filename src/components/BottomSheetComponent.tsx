import React from "react";
import { View } from "react-native";
import { List, Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = (arrayObj) => {
  const { price, location } = arrayObj;

  return (
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
      <View>
        <Title>{arrayObj.name}</Title>
        <Paragraph>
          {location.address1}
          {"\n"}
          {location.city} {location.state} {location.zip_code}
        </Paragraph>
      </View>
    </View>
  );
};

export default CustomSheet;
