import React from "react";

import { Text, Card, Title } from "react-native-paper";

const CardComponent = () => {
  return (
    <Card>
      <Card.Content>
        <Title>Card Title</Title>
        <Card.Cover source={{ uri: "../../assets/goodfood.jpg" }} />
        <Text>Card Text</Text>
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
