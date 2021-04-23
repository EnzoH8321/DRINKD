import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { Image } from "react-native";
import styles from "./src/styles/constant";
import Icon from "react-native-vector-icons/Ionicons";
//ReactNav
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";
//Store
import store from "./src/store/store";
//Types
import { HomeDrawerParamList } from "./src/types/types";
//Navigator Stack
const HomeDrawer = createBottomTabNavigator<HomeDrawerParamList>();
const HomeStack = createStackNavigator();

//Created function for debug purposes.
function setTabBarIconHome(size: number) {
  return <Icon name="newspaper-outline" size={size}></Icon>;
}
function setTabBarIconTopChoices(size: number) {
  return <Icon name="podium-outline" size={size}></Icon>;
}
function setTabBarIconJoin(size: number) {
  return <Icon name="person-add-outline" size={size}></Icon>;
}
function setTabBarIconCreate(size: number) {
  return <Icon name="person-outline" size={size}></Icon>;
}

function createHeader(props) {
  return (
    <Image
      source={require("./assets/splash-header.png")}
      style={{
        marginTop: 0,
        width: 300,
        height: 30,
      }}
      resizeMode="contain"
    ></Image>
  );
}

const Home = () => {
  return (
    <HomeDrawer.Navigator
      tabBarOptions={{
        activeTintColor: styles.colorPrimary.backgroundColor,
      }}
    >
      <HomeDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size }) => setTabBarIconHome(size),
        }}
      />
      <HomeDrawer.Screen
        name="Top Choices"
        component={TopChoiceScreen}
        options={{
          tabBarIcon: ({ size }) => setTabBarIconTopChoices(size),
        }}
      />
      <HomeDrawer.Screen
        name="Join Party"
        component={JoinScreen}
        options={{
          tabBarIcon: ({ size }) => setTabBarIconJoin(size),
        }}
      />
      <HomeDrawer.Screen
        name="Create Party"
        component={CreateScreen}
        options={{
          tabBarIcon: ({ size }) => setTabBarIconCreate(size),
        }}
      />
    </HomeDrawer.Navigator>
  );
};

const Stack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home_Stack"
        component={Home}
        options={{
          headerTitle: (props) => createHeader(props),
          headerTitleAlign: "center",
          //For pixel devices or devices that show the status bar
          headerStatusBarHeight: 20,
        }}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

//Do i need to name this?...
export default function Main(): React.ReactElement {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PaperProvider>
          <Stack />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
}
