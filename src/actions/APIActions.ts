import { ApiAction } from "../types/types";

export const SET_BARLIST_DATA = "SET BARLIST DATA";
// export const GET_DATA_FAILURE = 'GET DATA FAILURE'

export const setApiData = (APIdata: []): ApiAction => ({
  type: SET_BARLIST_DATA,
  payload: APIdata,
});
