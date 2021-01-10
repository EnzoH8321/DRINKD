import React from "react";

import { Provider as PaperProvider } from "react-native-paper";

//ReactNav
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";

//Stack
const HomeDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const Home = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="TopChoice" component={TopChoiceScreen} />
      <HomeDrawer.Screen name="JoinScreen" component={JoinScreen} />
    </HomeDrawer.Navigator>
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
