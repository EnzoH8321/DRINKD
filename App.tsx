import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import styles from "./src/styles/constant";

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

//Stack
const HomeDrawer = createBottomTabNavigator<HomeDrawerParamList>();

const Home = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="Top Choices" component={TopChoiceScreen} />
      <HomeDrawer.Screen name="Join Party" component={JoinScreen} />
      <HomeDrawer.Screen name="Create Party" component={CreateScreen} />
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
