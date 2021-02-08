import { RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

//Api Business Search
export interface ApiSearch {
  alias: string;
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
  coordinates: {
    latitude: number;
    longitude: number;
  };
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: {
    address1: string;
    address2: string;
    address3: string;
    city: string;
    country: string;
    display_address: [string, string];
    state: string;
    zip_code: string;
  };
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: [string];
  url: string;
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

export type SetBarlistData = {
  type: "SET BARLIST DATA";
  payload: ApiSearch[];
};

export type SetUserName = {
  type: "SET USERNAME";
  payload: string;
};

export type SetInPartyData = {
  type: "SET INPARTY DATA";
  payload: boolean;
};

export type SetMemberLevel = {
  type: "SET MEMBER LEVEL";
  payload: "LEADER" | "MEMBER" | string;
};

export type SetPartyUrl = {
  type: "SET PARTY URL";
  payload: string;
};

export type SetPartyId = {
  type: "SET PARTY ID";
  payload: string;
};

export type BarListData = {
  type: "SET BARLIST DATA";
  payload: ApiSearch[];
};

//Navigation
type HomeDrawerParamList = {
  Home: undefined;
  TopChoice: undefined;
  JoinScreen: undefined;
  CreateScreen: undefined;
};

type CreateScreenRouteProp = RouteProp<HomeDrawerParamList, "CreateScreen">;

type ProfileScreenNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "CreateScreen"
>;

export type CreateScreenProps = {
  route: CreateScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
