import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

import { ApiBusiness } from "../types/types";
import { FlatList } from "react-native-gesture-handler";

type ArrayObj = {
  location: {
    city: string;
    country: string;
    address2: string;
    address3: string;
    state: string;
    address1: string;
    zip_code: string;
  };
  name: string;
  phone: string;
};

const CustomSheet = (
  arrayObj: ArrayObj,
  chosenCard: ApiBusiness | undefined
): React.ReactNode => {
  const { location, phone } = arrayObj;

  const photoArray = chosenCard ? chosenCard.photos : [];

  return (
    <View style={override.sheetContainer}>
      <View style={override.infoView}>
        <Title style={override.title}>{arrayObj.name}</Title>
        <Paragraph style={override.paragraph}>
          {location.address1} {location.address2}
          {"\n"}
          {location.city} {location.state} {location.zip_code}
          {"\n"}
          {phone}
        </Paragraph>
      </View>
      <FlatList
        data={photoArray}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={override.image}></Image>
        )}
        keyExtractor={(i) => i}
        horizontal={true}
        style={override.flatList}
      ></FlatList>
    </View>
  );
};

const override = StyleSheet.create({
  title: {
    fontSize: styles.fontL.fontSize,
  },
  infoView: {
    height: "20%",
  },
  paragraph: {
    fontSize: styles.fontS.fontSize,
    marginTop: "5%",
  },
  sheetContainer: {
    backgroundColor: styles.colorSecondary.backgroundColor,
    padding: 16,
    height: "100%",
  },
  flatList: {
    marginTop: "5%",
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
});

export default CustomSheet;
