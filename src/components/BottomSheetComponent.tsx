import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

import { ApiBusiness } from "../types/types";

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
      {chosenCard ? (
        <View style={override.imageArray}>
          <Image
            source={{
              uri: `${chosenCard.photos[0]}`,
            }}
            style={override.arrayImage}
          ></Image>
          <Image
            source={{
              uri: `${chosenCard.photos[1]}`,
            }}
            style={override.arrayImage}
          ></Image>
          <Image
            source={{
              uri: `${chosenCard.photos[2]}`,
            }}
            style={override.arrayImage}
          ></Image>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const override = StyleSheet.create({
  title: {
    fontSize: styles.fontL.fontSize,
  },
  infoView: {
    margin: 10,
  },
  paragraph: {
    fontSize: styles.fontS.fontSize,
  },
  imageArray: {
    flexDirection: "row",
  },
  arrayImage: {
    height: 200,
    width: 200,
  },
  sheetContainer: {
    backgroundColor: styles.colorSecondary.backgroundColor,
    padding: 16,
    height: "100%",
  },
});

export default CustomSheet;
