import { useEffect } from "react";
import { UserMsg } from "./UserMsg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOG } from "../store/user/reducer.js";
import { LogUser } from "./LogUser";
import { login, signup } from "../store/user/action.js";
import { ClipLoader } from "react-spinners";
import { logout } from "../store/user/action.js";

export function AppHeader() {
  const dispatch = useDispatch();
  const logToggle = useSelector((state) => state.userModule.logState);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const isLoading = useSelector((state) => state.naturalModule.isLoading);
  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  function toggleLogState(logState) {
    dispatch({ type: SET_LOG, logState });
  }

  async function handleLog(logState, formData) {
    logState === "in" ? await login(formData) : await signup(formData);
  }

  return (
    <header className="app-header">
      {logToggle && (
        <LogUser
          handleCloseLog={() => toggleLogState(null)}
          handleLog={handleLog}
        />
      )}
      <div className="header-container">
        <UserMsg />
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>
        </nav>
        <h1>Bugs are Forever</h1>
      </div>

      {isLoading ? (
        <ClipLoader color={"#000000"} loading={isLoading} size={75} />
      ) : loggedInUser ? (
        <section className="header-log">
          <button onClick={() => logout()}>Log out</button>
          <h4>Welcome {loggedInUser.username}</h4>
        </section>
      ) : (
        <section className="header-log">
          <button onClick={() => toggleLogState("in")}>Sign In</button>
          <button onClick={() => toggleLogState("up")}>Sign Up</button>
        </section>
      )}
    </header>
  );
}
