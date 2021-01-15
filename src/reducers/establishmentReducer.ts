import * as actions from "../actions/APIActions";

export const initialState = {
  establishmentList: [],
};

export default function establishmentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_ESTAB_DATA:
      return { ...state, establishmentList: action.payload };

    default:
      return state;
  }
}
