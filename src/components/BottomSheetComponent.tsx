import React from "react";
import { View } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import styles from "../styles/constant";

const CustomSheet = (arrayObj): React.ReactNode => {
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
    </View>
  );
};

export default CustomSheet;
