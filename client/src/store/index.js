import { applyMiddleware, compose, createStore } from "redux";
import * as reduxModule from "redux";
import createReducer from "./allReducers";
import thunk from "redux-thunk";

reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(createReducer(), enhancer);

export default store;
