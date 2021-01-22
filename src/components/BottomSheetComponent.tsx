import React from "react";
import { View, Image } from "react-native";
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
      {chosenCard ? (
        <View style={styles.imageArray}>
          <Image
            source={{
              uri: `${chosenCard.photos[0]}`,
            }}
            style={styles.arrayImage}
          ></Image>
          <Image
            source={{
              uri: `${chosenCard.photos[1]}`,
            }}
            style={styles.arrayImage}
          ></Image>
          <Image
            source={{
              uri: `${chosenCard.photos[2]}`,
            }}
            style={styles.arrayImage}
          ></Image>
        </View>
      ) : (
        <>
          <Paragraph>Still loading</Paragraph>
        </>
      )}
    </View>
  );
};

export default CustomSheet;
