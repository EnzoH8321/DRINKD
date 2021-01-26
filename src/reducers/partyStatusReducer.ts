import * as actions from "../actions/PartyActions";
import { SetInPartyData, SetMemberLevel } from "../types/types";

type InitialState = {
  inParty: boolean;
  memberLevel: "LEADER" | "MEMBER" | string;
};

//Initial State!
export const initialState = {
  inParty: false,
  memberLevel: "",
};

export default function partyStatusReducer(
  state = initialState,
  action: SetInPartyData | SetMemberLevel
): InitialState {
  switch (action.type) {
    case actions.SET_INPARTY_DATA:
      return { ...state, inParty: action.payload };

    case actions.SET_MEMBER_LEVEL:
      return { ...state, memberLevel: action.payload };

    default:
      return state;
  }
}
