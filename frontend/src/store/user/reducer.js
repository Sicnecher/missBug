export const SET_LOG = "SET_LOG";
export const SET_LOGGEDIN_USER = "SET_LOGGEDIN_USER";

const initialState = {
  logState: null,
  loggedInUser: null,
};

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOG:
      return {
        ...state,
        logState: action.logState,
      };
      case SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      };
    default:
      return state;
  }
}
