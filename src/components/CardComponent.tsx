import React from "react";
import { Card, Title, Paragraph, Subheading } from "react-native-paper";
import styles from "../styles/constant";
import { ApiSearch } from "../types/types";
import { StyleSheet, View } from "react-native";
//Icons
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

type BarData = {
  barData: ApiSearch;
};

const CardComponent = ({ barData }: BarData): React.ReactElement => {
  const {
    name,
    image_url,
    categories,
    location,
    display_phone,
    rating,
    price,
  } = barData;

  console.log(barData);

  return (
    <View>
      <Card style={override.card}>
        <Card.Content style={override.cardContent}>
          <Title style={override.cardTitle}>{name}</Title>
          <Paragraph style={{ fontSize: override.paragraph.fontSize }}>
            {categories[0]?.title} {`${categories[1] ? "-" : ""}`}{" "}
            {categories[1]?.title} {`${categories[2] ? "-" : ""}`}{" "}
            {categories[2]?.title}
          </Paragraph>
          <Paragraph style={{ fontSize: override.paragraph.fontSize }}>
            {rating} / {price}
          </Paragraph>
          <View style={override.scrollViewParent}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <Card.Cover
                source={{ uri: `${image_url}` }}
                style={override.cardImage}
              />
              <View style={override.smallInfoView}>
                <Icon name="home-outline" style={override.icon}></Icon>
                <Paragraph style={override.paragraph}>
                  {location.address1} {location.address2}
                  {"\n"}
                  {location.city}, {location.state} {location.zip_code}
                </Paragraph>
              </View>
              <View style={override.smallInfoView}>
                <Icon name="call-outline" style={override.icon}></Icon>
                <Paragraph style={override.paragraph}>
                  {display_phone}
                </Paragraph>
              </View>
            </ScrollView>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const override = StyleSheet.create({
  card: {
    height: "99%",
    width: "99%",
    borderRadius: styles.border.borderRadius,
    ...styles.shadow,
  },

  scrollViewParent: {
    flexGrow: 1,
    marginTop: "2%",
  },
  smallInfoView: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "2%",
  },
  cardImage: {
    borderRadius: styles.border.borderRadius,
    // marginTop: "8%",
    height: "75%",
  },
  cardSubheadingView: {
    marginTop: "5%",
  },
  cardSubheading: {
    marginTop: "2%",
    fontSize: styles.fontM.fontSize,
  },
  cardContent: {
    height: "100%",
  },
  cardTitle: {
    fontSize: styles.fontL.fontSize,
    marginBottom: "2%",
  },

  paragraph: {
    fontSize: styles.fontS.fontSize,
    marginTop: "5%",
    marginLeft: "5%",
  },
  icon: {
    fontSize: 32,
    alignSelf: "flex-end",
  },
});

export default CardComponent;
