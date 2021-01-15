export const SET_ESTAB_DATA = "SET ESTAB DATA";
// export const GET_DATA_FAILURE = 'GET DATA FAILURE'

export const setApiData = (APIdata) => {
  return {
    type: SET_ESTAB_DATA,
    payload: APIdata,
  };
};
