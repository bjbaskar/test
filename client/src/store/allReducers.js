import { combineReducers } from "redux";
import coreReducer from "../core/store";
import reducer from "../module1/store";

const createReducer = asyncReducers =>
  combineReducers({
    coreReducer,
    reducer,
    ...asyncReducers
  });

export default createReducer;
