import { SetApiData } from "../types/types";

export const SET_BARLIST_DATA = "SET BARLIST DATA";

export const setBarListData = (APIdata: []): SetApiData => ({
  type: SET_BARLIST_DATA,
  payload: APIdata,
});
