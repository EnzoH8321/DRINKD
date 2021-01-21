import React from "react";
import { View, Image } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

import { ArrayObj, ApiBusiness } from "../types/types";

const CustomSheet = (
  arrayObj: ArrayObj,
  chosenCard: ApiBusiness
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
        <View>
          <Paragraph>{chosenCard.name}</Paragraph>
          <Image
            source={{
              uri: `${chosenCard.photos[0]}`,
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
