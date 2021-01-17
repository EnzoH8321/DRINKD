import React from "react";
import styles from "../styles/constant";
import { Card, Title, Subheading } from "react-native-paper";

const CardComponent = ({ businessData }) => {
  const { name, image_url, rating, price } = businessData;

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
