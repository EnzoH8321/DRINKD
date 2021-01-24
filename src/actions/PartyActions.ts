import { SetInPartyData } from "../types/types";

export const SET_INPARTY_DATA = "SET INPARTY DATA";

export const setPartyData = (data: boolean): SetInPartyData => ({
  type: SET_INPARTY_DATA,
  payload: data,
});
