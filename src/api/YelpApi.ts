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
        Authorization:
          "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
      },
    });

    const businessData = data.data.businesses;

    //Returns an array of businesses
    return businessData;
  } catch (error) {
    console.log("the error is" + error);
  }
}
