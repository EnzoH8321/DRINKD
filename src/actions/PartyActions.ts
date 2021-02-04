import {
  SetInPartyData,
  SetMemberLevel,
  SetPartyUrl,
  SetPartyId,
  SetUserName,
} from "../types/types";

export const SET_USERNAME = "SET USERNAME";
export const SET_INPARTY_DATA = "SET INPARTY DATA";
export const SET_MEMBER_LEVEL = "SET MEMBER LEVEL";
export const SET_PARTY_URL = "SET PARTY URL";
export const SET_PARTY_ID = "SET PARTY ID";

export const setUserName = (data: string): SetUserName => ({
  type: SET_USERNAME,
  payload: data,
});

export const setPartyData = (data: boolean): SetInPartyData => ({
  type: SET_INPARTY_DATA,
  payload: data,
});

export const setMemberLevel = (data: string): SetMemberLevel => ({
  type: SET_MEMBER_LEVEL,
  payload: data,
});

export const setPartyURL = (data: string): SetPartyUrl => ({
  type: SET_PARTY_URL,
  payload: data,
});

export const setPartyId = (data: string): SetPartyId => ({
  type: SET_PARTY_ID,
  payload: data,
});
