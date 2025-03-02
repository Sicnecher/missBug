import { authService } from "./auth.service.js";

export async function signup(req, res) {
  try {
    const credentials = req.body;
    console.log(credentials);
    const account = await authService.signup(credentials);
    const user = await authService.login(
      credentials.username,
      credentials.password
    );
    console.log(user);
    res.cookie("loginToken", authService.getLoginToken(user), {
      sameSite: "None",
      secure: true,
    });
    console.log("im right here");
    res.json(user);
  } catch (error) {
    res.status(400).send({ error: "Couldn't get bugs", details: error });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await authService.login(username, password);
    const loginToken = authService.getLoginToken(user);
    res.cookie("loginToken", loginToken, { sameSite: "None", secure: true });
    res.json(user);
  } catch (error) {
    console.log("Error: ", error);
    res.status(401).send({ error: "Failed to Login" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("loginToken");
    res.send({ message: "Logged out Succesfully" });
    res.end();
  } catch (error) {
    console.log("Error: ", error);
    res.status(401).send({ error: "Failed to Logout" });
  }
}
