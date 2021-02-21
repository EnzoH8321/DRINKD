import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import styles from "./src/styles/constant";

//ReactNav
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";
//Store
import store from "./src/store/store";
//Icon
import Icon from "react-native-vector-icons/FontAwesome";

//Stack
const HomeDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

function displayIcon() {
  return (
    <TouchableOpacity style={override.iconContainer}>
      <Icon name="bars" style={override.icon}></Icon>
    </TouchableOpacity>
  );
}

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
      <AppStack.Screen
        name="HomeApp"
        component={Home}
        options={{
          title: "Home",
          headerStyle: {
            backgroundColor: styles.colorSecondary.backgroundColor,
          },
          headerTitleStyle: {
            fontSize: styles.fontL.fontSize,
          },
          headerLeft: displayIcon,
          headerTitleAlign: "center",
        }}
      />
    </AppStack.Navigator>
  );
};

//Do i need to name this?...
export default function Main(): React.ReactElement {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <App />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}

const override = StyleSheet.create({
  iconContainer: {
    marginLeft: 10,
  },
  icon: {
    fontSize: 32,
  },
});
