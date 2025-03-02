import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { bugReducer } from "./bug/reducer";
import { userReducer } from "./user/reducer";
import { naturalReducer } from "./natural/reducer";

const rootReducer = combineReducers({
  bugModule: bugReducer,
  userModule: userReducer,
  naturalModule: naturalReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers());

window.gStore = store;
