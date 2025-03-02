import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

import axios from "axios";

const myAxios = axios.create({
  withCredentials: true, // Send cookies with requests (if needed)
});

export const userService = {
  loadUser,
  signup,
  login,
  logout,
  _saveLocalUser,
};

async function loadUser() {
  return await storageService.get("user");
}

async function signup(credentials) {
  console.log("credentials", credentials);
  const { data } = await myAxios.post(
    "http://localhost:3000/api/auth/signup",
    credentials
  );
  _saveLocalUser(data);
  console.log(data);
  return data;
}

async function login(credentials) {
  const { data } = await myAxios.post(
    "http://localhost:3000/api/auth/login",
    credentials
  );
  return data;
}

async function logout() {
  await myAxios.post("http://localhost:3000/api/auth/logout");
  localStorage.removeItem("user");
  return;
}

async function _saveLocalUser(user) {
  return await storageService._save("user", user);
}
