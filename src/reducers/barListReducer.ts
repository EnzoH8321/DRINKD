import * as actions from "../actions/APIActions";

import { SetBarlistData, ApiSearch } from "../types/types";

type InitialState = {
  barList: ApiSearch[];
};

export const initialState = {
  barList: [],
};

export default function barListReducer(
  state = initialState,
  action: SetBarlistData
): InitialState {
  switch (action.type) {
    case actions.SET_BARLIST_DATA:
      return { ...state, barList: action.payload };

    default:
      return state;
  }
}
