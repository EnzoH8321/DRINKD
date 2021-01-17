import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { List, Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = (arrayObj) => {
  const { price, location, phone } = arrayObj;

  return (
    <View style={styles.sheetContainer}>
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
