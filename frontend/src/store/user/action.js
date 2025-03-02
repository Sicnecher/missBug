import { userService } from "../../services/user.service";
import { SET_IS_LOADING } from "../bug/reducer";

import { store } from "../store";

import { SET_LOG, SET_LOGGEDIN_USER } from "./reducer";

export async function loadUser(){
  try{
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    const loggedInUser = await userService.loadUser();
    console.log(loggedInUser)
    store.dispatch({ type: SET_LOGGEDIN_USER, loggedInUser });
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }catch(err){
    console.error(err);
  }
}

export async function signup(data) {
  try {
    const loggedInUser = await userService.signup(data);
    store.dispatch({ type: SET_LOG, logState: false });
    store.dispatch({ type: SET_LOGGEDIN_USER, loggedInUser });
  } catch (err) {
    console.error(err);
  }
}

export async function login(data) {
  try {
    userService.login(data);
    store.dispatch({ type: SET_LOG, logState: false });
  } catch (err) {
    console.error(err);
  }
}

export async function logout() {
  try {
    userService.logout();
    store.dispatch({ type: SET_LOGGEDIN_USER, loggedInUser: null });
  } catch (err) {
    console.error(err);
  }
}