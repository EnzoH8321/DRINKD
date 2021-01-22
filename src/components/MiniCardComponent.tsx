import React from "react";

import { Text, Card } from "react-native-paper";

const MiniCardComponent = (): React.ReactElement => {
  return (
    <Card>
      <Card.Content>
        <Text>Choice</Text>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
