import { combineReducers } from "redux";
import customerReducer from "./reducer";

const rootReducer = combineReducers({
  data: customerReducer,
});

export default rootReducer;
