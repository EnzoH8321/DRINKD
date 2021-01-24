import * as actions from "../actions/PartyActions";
import { SetInPartyData } from "../types/types";

type InitialState = {
  inParty: boolean;
};

export const initialState = {
  inParty: false,
};

export default function partyStatusReducer(
  state = initialState,
  action: SetInPartyData
): InitialState {
  switch (action.type) {
    case actions.SET_INPARTY_DATA:
      return { ...state, inParty: action.payload };

    default:
      return state;
  }
}
