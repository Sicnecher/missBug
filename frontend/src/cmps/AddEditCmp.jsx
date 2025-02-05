export function AddEditCmp({ type, onEditBug, onAddBug, bug, onCloseWindow }) {
  return (
    <section className="add-edit">
      <h2>{type}</h2>
      <form
        onSubmit={(ev) => {
            ev.preventDefault()
          type === "Add" ? onAddBug(ev.target) : onEditBug({...bug, severity: ev.target.severity.value});
        }}
      >
        {type === "Add" && <input type="text" placeholder="Enter Title" name="title" />}
        <input
          type="number"
          placeholder={type === "Add" ? "Add Severity" : "Change Severity"}
          name="severity"
        />
        <button type="submit">Send</button>
      </form>
      <h5 onClick={onCloseWindow}>x</h5>
    </section>
  );
}
