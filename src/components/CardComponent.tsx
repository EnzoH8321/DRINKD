import React from "react";
import { Card, Title, Subheading } from "react-native-paper";
import styles from "../styles/constant";
import { ApiSearch } from "../types/types";
import { StyleSheet, View } from "react-native";

type BarData = {
  barData: ApiSearch;
};

const CardComponent = ({ barData }: BarData): React.ReactElement => {
  const { name, image_url, rating, price } = barData;

  return (
    <View>
      <Card style={override.card}>
        <Card.Content style={override.cardContent}>
          <Title style={override.cardTitle}>{name}</Title>
          <Card.Cover
            source={{ uri: `${image_url}` }}
            style={override.cardImage}
          />
          <View style={override.cardSubheadingView}>
            <Subheading style={override.cardSubheading}>{rating}</Subheading>
            <Subheading style={override.cardSubheading}>{price}</Subheading>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const override = StyleSheet.create({
  card: {
    height: "100%",
    borderRadius: styles.border.borderRadius,
  },
  cardImage: {
    borderRadius: styles.border.borderRadius,
    marginTop: "8%",
    height: "65%",
  },
  cardSubheadingView: {
    marginTop: "2%",
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
});

export default CardComponent;
