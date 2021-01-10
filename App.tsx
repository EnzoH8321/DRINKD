import React from "react";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

//ReactNav
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";

//Stack
const HomeStack = createDrawerNavigator();
const AppStack = createStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="TopChoice" component={TopChoiceScreen} />
    </HomeStack.Navigator>
  );
};

const App = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="HomeApp" component={Home} />
    </AppStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
};
