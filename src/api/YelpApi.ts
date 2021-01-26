import * as Location from "expo-location";
import axios from "axios";

import { setPartyURL } from "../actions/PartyActions";

import { useDispatch } from "react-redux";

export default async function fetchBusiness() {
  try {
    // const dispatch = useDispatch();

    const { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const locationLat = location.coords.latitude.toString();
    const locationLong = location.coords.longitude.toString();
    const url = `https://api.yelp.com/v3/businesses/search?categories=bars&latitude=${locationLat}&longitude=${locationLong}&limit=10`;

    const data = await axios(
      `https://api.yelp.com/v3/businesses/search?categories=bars&latitude=${locationLat}&longitude=${locationLong}&limit=10`,
      {
        method: "GET",
        headers: {
          Authorization:
            "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
        },
      }
    );

    console.log(data.data.businesses);

    //Returns an array of objects
    return data.data.businesses;
  } catch (error) {
    console.log(error);
  }
}
