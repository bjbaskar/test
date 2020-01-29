import * as Actions from "../actions/members.action";

const initialState = {
  data: []
};

const membersReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_MEMBERS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.GET_EVENTS: {
      return {
        ...state,
        eventsdata: action.payload
      };
    }
    case Actions.SET_EVENTS: {
      return {
        ...state,
        setevents: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default membersReducer;
