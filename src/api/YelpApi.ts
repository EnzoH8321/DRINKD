import axios from "axios";

export default async function fetchBusiness(url: string) {
  try {
    // const dispatch = useDispatch();

    const data = await axios(url, {
      method: "GET",
      headers: {
        Authorization:
          "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
      },
    });

    //Returns an array of objects
    return data.data.businesses;
  } catch (error) {
    console.log(error);
  }
}
