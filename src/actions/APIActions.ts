import { BarListData, ApiSearch } from "../types/types";

export const SET_BARLIST_DATA = "SET BARLIST DATA";

export const setBarListData = (
  APIdata: [ApiSearch] | undefined
): BarListData => ({
  type: SET_BARLIST_DATA,
  payload: APIdata,
});
