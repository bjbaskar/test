import * as Actions from "./api.actions";

const initialState = {
  loading: null,
  data: null,
  label: "",
  error: null
};

const apiReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.REQUEST_START: {
      return {
        ...state,
        payload: action.payload
      };
    }
    case Actions.REQUEST_END: {
      return {
        ...state,
        open: false
      };
    }
    case Actions.REQUEST_ERROR: {
      return {
        ...state,
        open: false
      };
    }
    default: {
      return state;
    }
  }
};

export default apiReducer;
