import React, { ReactElement } from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import styles from "../styles/constant";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
//Expo
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
//Types
import { ApiSearch } from "../types/types";
type BarData = {
  barData: ApiSearch;
};
//
const CardComponent = ({ barData }: BarData): React.ReactElement => {
  const {
    name,
    image_url,
    categories,
    location,
    display_phone,
    rating,
    phone,
    price,
    transactions,
    url,
  } = barData;
  //Gets window dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  //Returns Transaction components
  function setTransactionsUI(transactions: string[]) {
    //Holds React elements for the delivery status component
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

  //Access Phone on
  function handlePhonePress(phoneNumber: string) {
    Linking.canOpenURL(`tel:${phoneNumber}`).then((obj) => {
      if (obj) {
        Linking.openURL(`tel:${phoneNumber}`);
      } else {
        Alert.alert("Not Able to Access Phone");
      }
    });
  }

  const override = StyleSheet.create({
    card: {
      height: windowHeight < 700 ? "97%" : "99%",
      width: windowWidth < 400 ? "90%" : "99%",
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
    scrollViewStyle: {
      flexGrow: 1,
      ////Due to android scrollview pecularities, we need to make the scrollview a lot bigger than container
      height: "110%",
    },
    smallInfoView: {
      display: "flex",
      flexDirection: "row",
      marginBottom: "2%",
    },
    cardImage: {
      borderRadius: styles.border.borderRadius,
      height: "55%",
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
      justifyContent: "flex-start",
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
    touchableOpacityPhoneNumber: {
      marginTop: "5%",
      marginLeft: "5%",
    },
    touchableOpacityPhoneIcon: {
      marginTop: "10%",
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
                flexGrow: override.scrollViewStyle.flexGrow,
                //Due to android scrollview pecularities, we need to make the scrollview a lot bigger than container
                height: override.scrollViewStyle.height,
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
                        console.log("the error is" + error);
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
                <TouchableOpacity
                  onPress={() => handlePhonePress(phone)}
                  style={override.touchableOpacityPhoneIcon}
                >
                  <Icon name="call-outline" style={override.icon}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePhonePress(phone)}
                  style={override.touchableOpacityPhoneNumber}
                >
                  <Paragraph style={override.paragraph}>
                    {display_phone}
                  </Paragraph>
                </TouchableOpacity>
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
