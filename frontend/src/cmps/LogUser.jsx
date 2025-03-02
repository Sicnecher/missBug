import { useSelector } from "react-redux";
import { useRef } from "react";

export function LogUser({ handleCloseLog, handleLog }) {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const logState = useSelector((state) => state.userModule.logState);

  function handleSubmit(ev) {
    ev.preventDefault();
    const formData = emailRef.current
      ? {
          email: emailRef.current.value,
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }
      : {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        };
    handleLog(logState, formData);
  }

  return (
    <section className="log-user">
      {logState === "in" ? (
        <div>
          <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input type="text" id="username" name="username" ref={usernameRef} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passwordRef} />
            <button>Log in</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" ref={emailRef} />
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" ref={usernameRef} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" ref={passwordRef} />
            <button>Sign up</button>
          </form>
        </div>
      )}
      <button onClick={handleCloseLog}>Cancel</button>
    </section>
  );
}
