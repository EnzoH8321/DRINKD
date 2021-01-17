import * as actions from "../actions/BottomSheetAction";

export const initialState = {
  buttomType: null,
};

export default function establishmentReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_BOTTOM_STYLE:
      return { ...state, buttomType: action.payload };

    default:
      return state;
  }
}
