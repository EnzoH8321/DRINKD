import firebase from "firebase";

const firebaseConfig = {
  //Not really necessary to send to a env variable but w/e
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "drinkd-dev.firebaseapp.com",
  //Change this back for production
  databaseURL: "https://drinkd-dev-default-rtdb.firebaseio.com",
  projectId: "drinkd-dev",
  storageBucket: "drinkd-dev.appspot.com",
  messagingSenderId: "811366010805",
  appId: "1:811366010805:web:e889f8bbf3e51cb71e53fc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
