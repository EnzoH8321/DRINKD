import { combineReducers } from "redux";
import establishmentReducer from "./establishmentReducer";

const rootReducer = combineReducers({
  establishment: establishmentReducer,
});

export default rootReducer;
