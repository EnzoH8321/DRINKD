//“always use interface for public API’s definition when authoring a library or 3rd-party ambient type definitions.”
//“consider using type for your React Component Props and State, because it is more constrained.”

//Api Business Search
export interface ApiSearch {
  total: number;
  businesses: [
    {
      rating: number;
      price: string;
      phone: string;
      id: string;
      alias: string;
      is_closed: boolean;
      categories: [
        {
          alias: string;
          title: string;
        }
      ];
      review_count: number;
      name: string;
      url: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      image_url: string;
      location: {
        city: string;
        country: string;
        address2: string;
        address3: string;
        state: string;
        address1: string;
        zip_code: string;
      };
      distance: number;
      transactions: string[];
    }
    // ...
  ];
  region: {
    center: {
      latitude: number;
      longitude: number;
    };
  };
}

//Api Business Details
export interface ApiBusiness {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: boolean;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: [
    {
      alias: string;
      title: string;
    },
    {
      alias: string;
      title: string;
    },
    {
      alias: string;
      title: string;
    }
  ];
  rating: number;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: [string, string];
    cross_streets: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  photos: [string, string, string];
  price: string;
  hours: [
    {
      open: [
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        },
        {
          is_overnight: boolean;
          start: string;
          end: string;
          day: number;
        }
      ];
      hours_type: string;
      is_open_now: boolean;
    }
  ];
  transactions: [];
  special_hours: [
    {
      date: string;
      is_closed: null;
      start: string;
      end: string;
      is_overnight: boolean;
    }
  ];
}

export type Item = {
  item: ApiSearch;
};

export type ID = {
  cardID: ApiSearch;
};

export type CardComp = {
  businessData: ApiSearch;
};

export type ArrayObj = {
  location: {
    city: string;
    country: string;
    address2: string;
    address3: string;
    state: string;
    address1: string;
    zip_code: string;
  };
  name: string;
  phone: string;
};

export type ChosenCard = {
  chosenCard: ApiBusiness;
};

export type ApiAction = {
  type: "SET ESTAB DATA";
  payload: ApiSearch[];
};
