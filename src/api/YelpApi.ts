import axios from "axios";
//Types
import { ApiSearch } from "../types/types";

export default async function fetchBusiness(
  url: string
): Promise<[ApiSearch] | undefined> {
  try {
    const data = await axios(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      },
    });

    const businessData = data.data.businesses;

    //Returns an array of businesses
    return businessData;
  } catch (error) {
    console.log("the error is" + error);
  }
}
