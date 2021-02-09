import React from "react";

import { Text, Card } from "react-native-paper";

const MiniCardComponent = ({ index }): React.ReactElement => {
  return (
    <Card>
      <Card.Content>
        <Text>{index}. Choice - </Text>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
