import * as actions from "../actions/PartyActions";
import { SetInPartyData, SetMemberLevel, SetPartyUrl } from "../types/types";

type InitialState = {
  inParty: boolean;
  memberLevel: "LEADER" | "MEMBER" | string;
  partyURL: string;
};

//Initial State!
export const initialState = {
  inParty: false,
  memberLevel: "",
  partyURL: "",
};

export default function partyStatusReducer(
  state = initialState,
  action: SetInPartyData | SetMemberLevel | SetPartyUrl
): InitialState {
  switch (action.type) {
    case actions.SET_INPARTY_DATA:
      return { ...state, inParty: action.payload };

    case actions.SET_MEMBER_LEVEL:
      return { ...state, memberLevel: action.payload };

    case actions.SET_PARTY_URL:
      return { ...state, partyURL: action.payload };

    default:
      return state;
  }
}
