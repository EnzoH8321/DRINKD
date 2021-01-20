import axios from "axios";

export default async function fetchBusinessInfo(id) {
  const data = await axios(`https://api.yelp.com/v3/businesses/${id}`, {
    method: "GET",
    headers: {
      Authorization:
        "BEARER nX9W-jXWsXSB_gW3t2Y89iwQ-M7SR9-HVBHDAqf1Zy0fo8LTs3Q1VbIVpdeyFu7PehJlkLDULQulnJ3l6q6loIET5JHmcs9i3tJqYEO02f39qKgSCi4DAEVIlgPPX3Yx",
    },
  });

  console.log(data.data);
  setCardDetails(data);
}
