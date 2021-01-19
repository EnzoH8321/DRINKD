//“always use interface for public API’s definition when authoring a library or 3rd-party ambient type definitions.”
//“consider using type for your React Component Props and State, because it is more constrained.”

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

export type Item = {
  item: ApiSearch;
};

export type CardComp = {
  businessData: ApiSearch;
};

export type ApiAction = {
  type: "SET ESTAB DATA";
  payload: ApiSearch[];
};
