import React, { ReactText } from "react";

import { Text, Card } from "react-native-paper";

type Props = {
  index: number;
  name?: string;
  number?: ReactText;
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
          {index}. {name} - {number} Votes
        </Text>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
