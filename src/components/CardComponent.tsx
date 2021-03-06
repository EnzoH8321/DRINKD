import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import styles from "../styles/constant";
import { ApiSearch } from "../types/types";
import { StyleSheet, View } from "react-native";
//Icons
import Icon from "react-native-vector-icons/Ionicons";

type BarData = {
  barData: ApiSearch;
};

const CardComponent = ({ barData }: BarData): React.ReactElement => {
  const { name, image_url, categories } = barData;

  return (
    <View style={override.cardView}>
      <Card style={override.card}>
        <Card.Content style={override.cardContent}>
          <Title style={override.cardTitle}>{name}</Title>
          <Paragraph>
            {categories[0]?.title} {`${categories[1] ? "-" : ""}`}{" "}
            {categories[1]?.title} {`${categories[2] ? "-" : ""}`}{" "}
            {categories[2]?.title}
          </Paragraph>
          <Card.Cover
            source={{ uri: `${image_url}` }}
            style={override.cardImage}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const override = StyleSheet.create({
  card: {
    height: "99%",
    width: "99%",
    borderRadius: styles.border.borderRadius,
    ...styles.shadow,
  },
  cardView: {},
  cardImage: {
    borderRadius: styles.border.borderRadius,
    marginTop: "8%",
    height: "75%",
  },
  cardSubheadingView: {
    marginTop: "5%",
  },
  cardSubheading: {
    marginTop: "2%",
    fontSize: styles.fontM.fontSize,
  },
  cardContent: {
    height: "100%",
  },
  cardTitle: {
    fontSize: styles.fontL.fontSize,
  },
  ratingView: {
    flexDirection: "row",
  },
  priceView: {
    flexDirection: "row",
    marginTop: "2%",
  },
});

export default CardComponent;
