import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOxlOHr3T3T7EY-g2YQualK6QC8ybwMkE",
  authDomain: "drinkd-dev.firebaseapp.com",
  databaseURL: "https://drinkd-dev-default-rtdb.firebaseio.com",
  projectId: "drinkd-dev",
  storageBucket: "drinkd-dev.appspot.com",
  messagingSenderId: "811366010805",
  appId: "1:811366010805:web:e889f8bbf3e51cb71e53fc",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
