import { combineReducers } from "redux";
import dialogReducer from "./reducers/dialogReducer";
import membersReducer from "./reducers/members.reducer";

const reducer = combineReducers({
  dialogReducer,
  membersReducer
});

export default reducer;
