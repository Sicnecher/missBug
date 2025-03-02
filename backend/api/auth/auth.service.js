import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import { userService } from "../user/user.service.js";

const cryptr = new Cryptr(process.env.SECRET1 || "secret-123");

export const authService = {
  getLoginToken,
  validateToken,
  login,
  signup,
};

function getLoginToken(user) {
  const str = JSON.stringify(user);
  let encryptedStr = cryptr.encrypt(str);
  return encryptedStr;
}

function validateToken(token) {
  try {
    const json = cryptr.decrypt(token);
    const loggedinUser = JSON.parse(json);
    return loggedinUser;
  } catch (err) {
    console.log("Invalid login token");
  }
  return null;
}

async function login(username, password) {
  var user = await userService.getByUsername(username);
  if (!user) throw "Unknown username";

  console.log('dssd', user);

  //! un-comment for real login
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid username or password";

  //* Removing passwords and personal data
  const miniUser = {
    _id: user._id,
    username: user.username,
    score: user.score,
    isAdmin: user.isAdmin,
  };
  return miniUser;
}

async function signup({ username, password, email }) {
  const saltRounds = 10;
  console.log('im here')
  console.log(username, password, email);

  if (!username || !password || !email) throw "Missing fields";
  console.log('here')

  const userExist = await userService.getByUsername(username);
  if (userExist) throw "Username already taken";

  console.log('here')

  const hash = await bcrypt.hash(password, saltRounds);
  return userService.save({
    username,
    password: hash,
    email,
    score: 1000,
    isAdmin: false,
  });
}
