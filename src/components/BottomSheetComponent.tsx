import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import styles from "../styles/constant";
import { FlatList } from "react-native-gesture-handler";
//types
import { ApiSearch } from "../types/types";

//Icons
import Icon from "react-native-vector-icons/Ionicons";

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
  apiPhotoArray: string[],
  detailedInfoObj: ApiSearch | undefined
): React.ReactNode => {
  const { location, phone } = arrayObj;

  return (
    <View style={override.sheetContainer}>
      <View style={override.infoView}>
        {/* <Title style={override.title}>{arrayObj.name}</Title> */}
        <View style={override.smallInfoView}>
          <Icon name="home-outline" style={override.icon}></Icon>
          <Paragraph style={override.paragraph}>
            {location.address1} {location.address2}
            {"\n"}
            {location.city} {location.state} {location.zip_code}
          </Paragraph>
        </View>
        <View style={override.smallInfoView}>
          <Icon name="call-outline" style={override.icon}></Icon>
          <Paragraph style={override.paragraph}>{phone}</Paragraph>
        </View>
      </View>
      <FlatList
        data={apiPhotoArray}
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
    // height: "20%",
  },
  smallInfoView: {
    display: "flex",
    flexDirection: "row",

    marginBottom: "1%",
  },
  paragraph: {
    fontSize: styles.fontS.fontSize,

    marginTop: "5%",
    marginLeft: "5%",
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
    borderRadius: styles.border.borderRadius,
  },
  icon: {
    fontSize: 32,
    alignSelf: "flex-end",
  },
});

export default CustomSheet;
