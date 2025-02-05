import img from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";

export function Home() {
  return (
    <section className="home">
      <h2>Welcome to the bugs app!</h2>
      <nav>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
      <h4>Please choose one of the above!</h4>
    </section>
  );
}
