import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../styles/constant";

//Firebase
import firebase from "../utils/firebase";

//Components
import MiniCardComponent from "../components/MiniCardComponent";

const TopChoicesScreen = (): React.ReactNode => {
  const [choicesArray, setChoicesArray] = useState();
  console.log(choicesArray);
  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const firebaseData = await firebase.database().ref(`parties/`);
        firebaseData.on("value", (snapshot) => {
          const data = snapshot.val();
          setChoicesArray(data);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <MiniCardComponent index={1} />
      <MiniCardComponent index={2} />
      <MiniCardComponent index={3} />
    </View>
  );
};

export default TopChoicesScreen;
