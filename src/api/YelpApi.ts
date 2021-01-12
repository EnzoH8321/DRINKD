//API

import * as Location from "expo-location";

export default async function fetchAPI() {
  const { status } = await Location.requestPermissionsAsync();

  if (status !== "granted") {
    alert("Permission to access denied");
    return;
  }

  let location = await Location.getCurrentPositionAsync();
  let locationLat = location.coords.latitude.toString;
  let locaitonLong = location.coords.longitude.toString;

  const data = await fetch(
    `https://api.yelp.com/v3/businesses/search?latitude=${locationLat}longitude=${locaitonLong}`,
    {
      method: "GET",
      headers: {
        Authorization:
          "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
      },
    }
  );

  return data.json();
}
