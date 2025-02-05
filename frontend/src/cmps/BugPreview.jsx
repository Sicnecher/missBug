export function BugPreview({ bug }) {
  return (
    <article>
      <h4>Title: {bug.title}</h4>
      <div
        className={`sevirity ${
          bug.sevirity < 3 ? "green" : bug.severity < 7 ? "yellow" : "red"
        }`}
      >
        {bug.severity}
      </div>
    </article>
  );
}
