import * as actions from "../actions/APIActions";

import { ApiAction } from "../types/types";

export const initialState = {
  barList: [],
};

export default function barListReducer(
  state = initialState,
  action: ApiAction
) {
  switch (action.type) {
    case actions.SET_BARLIST_DATA:
      return { ...state, barList: action.payload };

    default:
      return state;
  }
}
