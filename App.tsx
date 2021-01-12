import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import fetchAPI from "./src/api/YelpApi";

//ReactNav
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";

//Stack
const HomeDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const Home = () => {
  return (
    <HomeDrawer.Navigator>
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="TopChoice" component={TopChoiceScreen} />
      <HomeDrawer.Screen name="JoinScreen" component={JoinScreen} />
      <HomeDrawer.Screen name="CreateScreen" component={CreateScreen} />
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
  useEffect(() => {
    let data = fetchAPI();
    console.log(data);
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <App />
      </PaperProvider>
    </NavigationContainer>
  );
};
