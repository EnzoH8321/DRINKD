import * as actions from "../actions/PartyActions";

// import { ApiAction } from "../types/types";

export const initialState = {
  inParty: false,
};

export default function partyStatusReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_INPARTY_DATA:
      return { ...state, inParty: action.payload };

    default:
      return state;
  }
}
