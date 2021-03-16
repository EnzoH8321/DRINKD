import React, { ReactElement } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import styles from "../styles/constant";
import { ApiSearch } from "../types/types";
import { StyleSheet, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

//Icons
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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
    transactions,
    url,
  } = barData;

  function setTransactionsUI(transactions: string[]) {
    const transactionArray: ReactElement[] = [];

    transactions.map((value: string) => {
      if (value === "delivery") {
        transactionArray.push(
          <View style={override.smallInfoView}>
            <Icon name="bicycle" style={override.icon}></Icon>
            <Paragraph style={override.paragraph}>Delivery Available</Paragraph>
          </View>
        );
      }

      if (value === "pickup") {
        transactionArray.push(
          <View style={override.smallInfoView}>
            <Icon name="walk" style={override.icon}></Icon>
            <Paragraph style={override.paragraph}>Pickup Available</Paragraph>
          </View>
        );
      }

      if (value === "restaurant_reservation") {
        transactionArray.push(
          <View style={override.smallInfoView}>
            <Icon name="restaurant-outline" style={override.icon}></Icon>
            <Paragraph style={override.paragraph}>
              Reservations Available
            </Paragraph>
          </View>
        );
      }
    });

    return transactionArray;
  }

  const override = StyleSheet.create({
    card: {
      height: "98%",
      width: "99%",
      borderRadius: styles.border.borderRadius,
      ...styles.shadow,
    },

    scrollViewParent: {
      flexGrow: 1,
      marginTop: "2%",
      //For scrolling on Android, content needs to be bigger than its container. This forces scroll on container by
      //making height of container small
      height: "5%",
    },
    smallInfoView: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "2%",
    },
    cardImage: {
      borderRadius: styles.border.borderRadius,
      // marginTop: "8%",
      height: "50%",
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
    paragraphHeader: {
      fontSize: styles.fontM.fontSize,
    },
    icon: {
      fontSize: 32,
      alignSelf: "flex-end",
    },

    iconView: {
      position: "absolute",
      marginLeft: "75%",
      top: "125%",
    },

    iconTouchableOpacity: {
      paddingTop: 20,
      paddingBottom: 20,
      backgroundColor: styles.colorPrimary.backgroundColor,
      ...styles.shadow,
      borderRadius: 5,
    },

    iconPressable: {
      fontSize: 32,
      color: styles.colorSecondary.backgroundColor,
      alignSelf: "center",
    },
  });

  return (
    <View>
      <Card style={override.card}>
        <Card.Content style={override.cardContent}>
          <Title style={override.cardTitle}>{name}</Title>
          <Paragraph style={override.paragraphHeader}>
            {categories[0]?.title} {`${categories[1] ? "-" : ""}`}{" "}
            {categories[1]?.title} {`${categories[2] ? "-" : ""}`}{" "}
            {categories[2]?.title}
          </Paragraph>
          <Paragraph style={override.paragraphHeader}>
            {rating} / {price}
          </Paragraph>
          <View style={override.scrollViewParent}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                //Due to android scrollview pecularities, we need to make the scrollview a lot bigger than container
                height: "150%",
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
                <View style={override.iconView}>
                  <TouchableOpacity
                    style={override.iconTouchableOpacity}
                    onPress={() => {
                      try {
                        WebBrowser.openBrowserAsync(`${url}`);
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <Icon
                      name="restaurant-outline"
                      style={override.iconPressable}
                    ></Icon>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={override.smallInfoView}>
                <Icon name="call-outline" style={override.icon}></Icon>
                <Paragraph style={override.paragraph}>
                  {display_phone}
                </Paragraph>
              </View>

              {setTransactionsUI(transactions)}
            </ScrollView>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardComponent;
