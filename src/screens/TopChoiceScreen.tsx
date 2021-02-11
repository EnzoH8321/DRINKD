import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../styles/constant";

//Firebase
import firebase from "../utils/firebase";

//Components
import MiniCardComponent from "../components/MiniCardComponent";
import { Headline } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

const TopChoicesScreen = (): React.ReactNode => {
  const [choicesObject, setChoicesObject] = useState();
  const partyId = useSelector((state: RootState) => state.party.partyId);

  useEffect(() => {
    try {
      // the parenth below is syntax for => function(){...}
      (async () => {
        const firebaseData = await firebase
          .database()
          .ref(`parties/${partyId}`);

        firebaseData.on("value", (snapshot) => {
          const data = snapshot.val();
          setChoicesObject(data);
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {choicesObject ? (
        <>
          <MiniCardComponent index={1} />
          <MiniCardComponent index={2} />
          <MiniCardComponent index={3} />
        </>
      ) : (
        <Headline>You are not in a party</Headline>
      )}
    </View>
  );
};

export default TopChoicesScreen;
