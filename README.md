 <img src="/assets/splash_icon_app.png" height="200" justify-content='center'>

# DRINKD
App that lets you and your friend's plan for a night out. 

## Google Play Store
Check it out on the Google Play Store here -> https://play.google.com/store/apps/details?id=com.lowerbrunii.drinkdapp

## Why?
The hardest part about going for a night out with your friends is deciding where to go. Everyone has their own opinions, no one can decide on anything. With this app, you create a party, invite your friends and vote on which bar or restaurant you would like to go to. Highest vote wins. No arguing or complaining. 

## Getting Started

### If you have an Android Device, you can test out the App here (click on the link and scan the QR code) -> https://expo.io/@lowerbrunii/projects/drinkdapp

:fire: This app uses Firebase Realtime DB  + a Google Cloud Function that performs cleanup of inactive parties. You will need Firebase + A cleanup function to remove inactive parties (The default system used in the App is a GCF chron job that runs every hour).

```bash
# Clone this repo
git clone https://github.com/EnzoH8321/DRINKD.git && cd drinkdapp

# Install expo
npm install --global expo-cli

# Install Dependencies
npm install

# Configure your Firebase config in src/utils/firebase.ts (if using Firebase)
Set up is relatively easy. Create a Firebase account of your own and copy the firebaseConfig object in your Firebase SDK snippet and paste into the firebaseConfig in the repo. 
Important keys to note are the apikey and databaseURL.

# Run the app with Expo (Android)
expo start --android

# Run the app with Expo (iOS)
expo start --ios
```
## Tech Stack

* Expo
* React / React Native
* React Navigation
* Firebase

## TODO

 * Messenging Feature
 * iOS version
