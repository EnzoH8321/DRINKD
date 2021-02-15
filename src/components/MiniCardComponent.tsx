import React from "react";

import { Text, Card } from "react-native-paper";

type Props = {
  index: number;
  name?: string;
};

const MiniCardComponent = ({ index, name }: Props): React.ReactElement => {
  return (
    <Card>
      <Card.Content>
        <Text>
          {index}. {name}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
