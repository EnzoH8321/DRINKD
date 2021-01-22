import { combineReducers } from "redux";
import barListReducer from "./barListReducer";

const rootReducer = combineReducers({
  establishment: barListReducer,
});

export default rootReducer;
