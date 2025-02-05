import { Link } from "react-router-dom";
import { BugPreview } from "./BugPreview";
import EditIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TrashIcon from "@mui/icons-material/DeleteOutlineOutlined";

export function BugList({ bugs, onRemoveBug, onToggle }) {
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          <div className="preview-actions">
            <TrashIcon
            className="icon"
              onClick={() => {
                onRemoveBug(bug._id);
              }}
            />  
            <EditIcon
            className="icon"
              onClick={() => {
                onToggle("Edit", bug)
              }}
            />
            <Link to={`/bug/${bug._id}`}><button>Details</button></Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
