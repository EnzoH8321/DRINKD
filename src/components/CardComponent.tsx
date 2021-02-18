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
        <Card.Content>
          <Title>{name}</Title>
          <Card.Cover
            source={{ uri: `${image_url}` }}
            style={override.cardImage}
          />
          <View style={override.cardSubheading}>
            <Subheading>{rating}</Subheading>
            <Subheading>{price}</Subheading>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const override = StyleSheet.create({
  card: {
    borderRadius: styles.border.borderRadius,
    shadowRadius: styles.shadow.shadowRadius,
    height: "100%",
  },
  cardImage: {
    borderRadius: styles.border.borderRadius,
    marginTop: "8%",
  },
  cardSubheading: {
    marginTop: "5%",
  },
});

export default CardComponent;
