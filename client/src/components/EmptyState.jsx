import { Link } from "react-router-dom";
import "./EmptyState.css";

function EmptyState() {
  return (
    <div className="empty-state">
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love
        hearing about new ideas to improve our app.
      </p>
      <Link to="/add-feedback" className="btn-add-feedback">
        + Add Feedback
      </Link>
    </div>
  );
}

export default EmptyState;
