# DRINKD
App that lets you and your friend's plan for a night out. 

## Why?
The hardest part about going for a night out with your friends is deciding where to go. Everyone has their own opinions, no one can decide on anything. With this app, you create a party, invite your friends and vote on which bar or restaurant you would like to go to. Highest vote wins. No arguing or complaining. 

## Getting Started

:fire: This app uses Firebase Realtime DB  + a Google Cloud Function that performs cleanup of inactive parties. You will need Firebase + A cleanup function to remove inactive parties (recommended a GCF chron job that runs every hour).

```bash
# Clone this repo
git clone https://github.com/EnzoH8321/DRINKD.git && cd drinkdapp

# Install expo
npm install --global expo-cli

# Install Dependencies
npm install

# Configure your Firebase config in src/utils/firebase.ts (if using Firebase)
Set up is relatively easy. Create a Firebase account of your own and copy your Firebase SDK snippet + paste into this file. 
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
