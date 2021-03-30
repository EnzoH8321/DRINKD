import React, { ReactText } from "react";

import { Card, Headline } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import styles from "../styles/constant";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  index: number;
  name: string;
  number: ReactText;
  iconColor: string;
};

const MiniCardComponent = ({
  name,
  number,
  iconColor,
}: Props): React.ReactElement => {
  //Styles
  const override = StyleSheet.create({
    card: {
      borderRadius: styles.border.borderRadius,
      marginBottom: 30,
      width: "98%",
      flexDirection: "row",
      ...styles.shadow,
    },
    icon: {
      fontSize: styles.icon.fontSize,
      color: iconColor,
    },
    cardContent: {
      flexDirection: "row",
    },
    leftContent: {
      justifyContent: "center",
    },
    rightContent: {
      justifyContent: "center",
      marginLeft: "10%",
      marginRight: "10%",
    },
  });

  return (
    <Card style={override.card}>
      <Card.Content style={override.cardContent}>
        <View style={override.leftContent}>
          <Icon name="trophy-sharp" style={override.icon}></Icon>
        </View>
        <View style={override.rightContent}>
          <Headline>{name}</Headline>
          <Headline>{number ? `Votes - ${number}` : ""}</Headline>
        </View>
      </Card.Content>
    </Card>
  );
};

export default MiniCardComponent;
