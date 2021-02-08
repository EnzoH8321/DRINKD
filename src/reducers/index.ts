import { combineReducers } from "redux";
import barListReducer from "./barListReducer";
import partyStatusReducer from "./partyStatusReducer";

const rootReducer = combineReducers({
  establishment: barListReducer,
  party: partyStatusReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
