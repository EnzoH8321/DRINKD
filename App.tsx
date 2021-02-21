import React from "react";

import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import styles from "./src/styles/constant";

//ReactNav
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import TopChoiceScreen from "./src/screens/TopChoiceScreen";
import JoinScreen from "./src/screens/JoinScreen";
import CreateScreen from "./src/screens/Createscreen";
//Store
import store from "./src/store/store";

//Stack
const HomeDrawer = createDrawerNavigator();

const Home = () => {
  return (
    <HomeDrawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: styles.header.alignSelf,
        headerTintColor: styles.header.backgroundColor,
        headerTitleStyle: {
          fontSize: styles.fontL.fontSize,
        },
      }}
    >
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="TopChoice" component={TopChoiceScreen} />
      <HomeDrawer.Screen name="JoinScreen" component={JoinScreen} />
      <HomeDrawer.Screen name="CreateScreen" component={CreateScreen} />
    </HomeDrawer.Navigator>
  );
};

// const App = () => {
//   return (
//     <AppStack.Navigator>
//       <AppStack.Screen
//         name="HomeApp"
//         component={Home}
//         options={{
//           title: "Home",
//           headerStyle: {
//             backgroundColor: styles.colorSecondary.backgroundColor,
//           },
//           headerTitleStyle: {
//             fontSize: styles.fontL.fontSize,
//           },

//           headerTitleAlign: "center",
//         }}
//       />
//     </AppStack.Navigator>
//   );
// };

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
