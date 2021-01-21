import React from "react";
import styles from "../styles/constant";
import { Card, Title, Subheading } from "react-native-paper";

import { ApiSearch } from "../types/types";

const CardComponent = ({ barData }: ApiSearch): React.ReactNode => {
  const { name, image_url, rating, price } = barData;

  return (
    <Card>
      <Card.Content>
        <Title>{name}</Title>
        <Card.Cover source={{ uri: `${image_url}` }} style={styles.cardImage} />
        <Subheading>{rating}</Subheading>
        <Subheading>{price}</Subheading>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
