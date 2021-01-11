import React from "react";
import styles from "../styles/constant";
import { Text, Card, Title } from "react-native-paper";

const CardComponent = () => {
  return (
    <Card>
      <Card.Content>
        <Title>Card Title</Title>
        <Card.Cover
          source={require("../../assets/goodfood.jpg")}
          style={styles.cardImage}
        />
        <Text>Card Text</Text>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
``;
