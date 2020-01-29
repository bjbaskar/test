import * as Actions from "./actions";

const initialState = {
  open: true,
  searchText: ""
};

const NavOpenReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_NAV: {
      return {
        ...state,
        open: true
      };
    }
    case Actions.CLOSE_NAV: {
      return {
        ...state,
        open: false
      };
    }
    case Actions.SET_SUBJECTS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    default: {
      return state;
    }
  }
};

export default NavOpenReducer;
