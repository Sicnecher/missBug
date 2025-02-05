
export const SET_BUGS = "SET_BUGS";
export const REMOVE_BUG = "REMOVE_BUG";
export const ADD_BUG = "ADD_BUG";
export const EDIT_BUG = "EDIT_BUG";
export const SET_FILTER = "SET_FILTER";

const initialState = {
    bugs: [],
    filterBy: "",
};

export function mainReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BUGS:
      return { ...state, bugs: action.bugs };
      case REMOVE_BUG:
        return {
          ...state,
          bugs: state.bugs.filter((bug) => bug._id !== action.bugId),
        }
      case ADD_BUG:
        return {
          ...state,
          bugs: [...state.bugs, action.bug],
        }
      case EDIT_BUG:
        return {
          ...state,
          bugs: state.bugs.map((bug) => (bug._id === action.bug._id ? action.bug : bug)),
        }
      case SET_FILTER:
        return {
          ...state,
          filterBy: action.filter,
        }
    default:
      return state;
  }
}
