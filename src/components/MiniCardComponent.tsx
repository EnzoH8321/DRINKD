import React from "react";

import { Text, Card } from "react-native-paper";

type Props = {
  index: number;
  name?: string;
  number?: number;
};

const MiniCardComponent = ({
  index,
  name,
  number,
}: Props): React.ReactElement => {
  return (
    <Card>
      <Card.Content>
        <Text>
          {index}. {name} - {number}
        </Text>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
