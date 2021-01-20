import React from "react";
import { View, Image } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = (arrayObj, chosenCard) => {
  const { location, phone } = arrayObj;

  console.log(chosenCard);

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
              uri: `https://reactnative.dev/img/tiny_logo.png`,
            }}
            height={100}
            width={100}
            style={{ backgroundColor: "purple" }}
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
