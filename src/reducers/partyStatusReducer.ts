import * as actions from "../actions/PartyActions";
import {
  SetInPartyData,
  SetMemberLevel,
  SetPartyUrl,
  SetPartyId,
  SetUserName,
  SetToWinVotes,
} from "../types/types";

type InitialState = {
  inParty: boolean;
  memberLevel: "LEADER" | "MEMBER" | string;
  partyURL: string;
  partyId: string;
  userName: string;
  toWinVotes: string;
};

//Initial State!
export const initialState = {
  inParty: false,
  memberLevel: "",
  partyURL: "",
  partyId: "",
  userName: "",
  toWinVotes: "",
};

export default function partyStatusReducer(
  state = initialState,
  action:
    | SetInPartyData
    | SetMemberLevel
    | SetPartyUrl
    | SetPartyId
    | SetUserName
    | SetToWinVotes
): InitialState {
  switch (action.type) {
    case actions.SET_INPARTY_DATA:
      return { ...state, inParty: action.payload };

    case actions.SET_MEMBER_LEVEL:
      return { ...state, memberLevel: action.payload };

    case actions.SET_PARTY_URL:
      return { ...state, partyURL: action.payload };

    case actions.SET_PARTY_ID:
      return { ...state, partyId: action.payload };

    case actions.SET_USERNAME:
      return { ...state, userName: action.payload };

    case actions.SET_TOWIN_VOTES:
      return { ...state, toWinVotes: action.payload };

    default:
      return state;
  }
}
