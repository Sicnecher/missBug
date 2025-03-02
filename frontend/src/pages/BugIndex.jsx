import { bugService } from "../services/bug.service.js";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js";
import { BugList } from "../cmps/BugList.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { addBug, editBug, loadBugs, removeBug } from "../store/bug/action.js";
import { useSelector } from "react-redux";
import { AddEditCmp } from "../cmps/AddEditCmp.jsx";
import { useDispatch } from "react-redux";

export function BugIndex() {
  const dispatch = useDispatch();
  const bugs = useSelector((state) => state.bugModule.bugs);
  const [addEditToggle, setAddEditToggle] = useState({ type: "", bug: null });

  useEffect(() => {
    onLoadBugs();
  }, []);

  async function onLoadBugs() {
    await loadBugs();
  }

  async function onRemoveBug(bugId) {
    try {
      await removeBug(bugId);
      showSuccessMsg("Bug removed");
    } catch (err) {
      console.log("Error from onRemoveBug ->", err);
      showErrorMsg("Cannot remove bug");
    }
  }

  async function onAddBug(target) {
    const bug = {
      title: target.title.value,
      severity: target.severity.value,
    };
    try {
      await addBug(bug);
      setAddEditToggle({ type: "", bug: null });
      showSuccessMsg("Bug added");
    } catch (err) {
      console.log("Error from onAddBug ->", err);
      showErrorMsg("Cannot add bug");
    }
  }

  async function onEditBug(bugToSave) {
    try {
      await editBug(bugToSave);
      setAddEditToggle({ type: "", bug: null });
      showSuccessMsg("Bug updated");
    } catch (err) {
      console.log("Error from onEditBug ->", err);
      showErrorMsg("Cannot update bug");
    }
  }

  const handleToggle = (type, bug) => setAddEditToggle({ type, bug });

  return bugs && bugs[0] ? (
    <main className="main-layout">
      <h3>Bugs App</h3>
      <main>
        <button onClick={() => handleToggle("Add", null)}>Add Bug ⛐</button>
        <BugList
          bugs={bugs}
          onRemoveBug={onRemoveBug}
          onToggle={handleToggle}
        />
      </main>
      {addEditToggle.type.length > 0 && (
        <AddEditCmp
          type={addEditToggle.type}
          onEditBug={onEditBug}
          onAddBug={onAddBug}
          bug={addEditToggle.bug}
          onCloseWindow={() => handleToggle("", null)}
        />
      )}
    </main>
  ) : (
    <div>Loading...</div>
  );
}
