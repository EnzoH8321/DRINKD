import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider } from "react-redux";

//ReactNav
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";
//Store
import store from "./src/store/store";
//Types
import { HomeDrawerParamList } from "./src/types/types";
//Icon
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./src/styles/constant";

//Stack
const HomeDrawer = createBottomTabNavigator<HomeDrawerParamList>();

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//   },
// };

const Home = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icon name="newspaper-outline" size={size}></Icon>
          ),
        }}
      />
      <HomeDrawer.Screen
        name="Top Choices"
        component={TopChoiceScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icon name="podium-outline" size={size}></Icon>
          ),
        }}
      />
      <HomeDrawer.Screen
        name="Join Party"
        component={JoinScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icon name="person-add-outline" size={size}></Icon>
          ),
        }}
      />
      <HomeDrawer.Screen
        name="Create Party"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ size }) => (
            <Icon name="person-outline" size={size}></Icon>
          ),
        }}
      />
    </HomeDrawer.Navigator>
  );
};

//Do i need to name this?...
export default function Main(): React.ReactElement {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <Home />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
