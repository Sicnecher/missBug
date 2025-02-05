import { useState } from "react";
import { bugService } from "../services/bug.service.js";
import { showErrorMsg } from "../services/event-bus.service.js";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function BugDetails() {
  const [bug, setBug] = useState(null);
  const { bugId } = useParams();

  useEffect(() => {
    loadBug();
  }, []);

  async function loadBug() {
    try {
      const bug = await bugService.getById(bugId);
      setBug(bug);
    } catch (err) {
      showErrorMsg("Cannot load bug");
    }
  }

  if (!bug) return <h1>loadings....</h1>;
  return (
    <div className="bug-details main-layout">
      <h3>Bug Details 🐛</h3>
      <h4>{bug.title}</h4>
      <div style={{textAlign: "center"}}
        className={`sevirity ${
          bug.sevirity < 3 ? "green" : bug.severity < 7 ? "yellow" : "red"
        }`}
      >
        {bug.severity}
      </div>
      <Link to="/bug">Back to List</Link>
    </div>
  );
}
