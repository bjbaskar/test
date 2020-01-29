import * as Actions from "../actions/dialog";

const initialState = {
  data: [],
  searchText: "",
  dialogProps: {
    type: "edit",
    props: {
      open: false
    },
    data: null,
    mode: null
  }
};

const DialogOpenReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: "new",
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: "new",
          props: {
            open: false
          },
          data: action.data
        }
      };
    }
    case Actions.OPEN_DEL_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: "del",
          props: {
            open: true
          },
          data: action.data,
          mode: action.mode
        }
      };
    }
    case Actions.CLOSE_DEL_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: "del",
          props: {
            open: false
          },
          data: action.data,
          mode: action.mode
        }
      };
    }
    case Actions.OPEN_EDIT_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: action.mode,
          props: {
            open: true
          },
          data: action.data,
          mode: action.mode
        }
      };
    }
    case Actions.CLOSE_EDIT_DIALOG: {
      return {
        ...state,
        dialogProps: {
          type: action.mode,
          props: {
            open: false
          },
          data: action.data
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default DialogOpenReducer;
