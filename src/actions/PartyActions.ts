import { SetInPartyData, SetMemberLevel } from "../types/types";

export const SET_INPARTY_DATA = "SET INPARTY DATA";
export const SET_MEMBER_LEVEL = "SET MEMBER LEVEL";

export const setPartyData = (data: boolean): SetInPartyData => ({
  type: SET_INPARTY_DATA,
  payload: data,
});

export const setMemberLevel = (data: string): SetMemberLevel => ({
  type: SET_MEMBER_LEVEL,
  payload: data,
});
