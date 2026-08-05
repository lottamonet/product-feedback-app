import { Link } from "react-router-dom";
import "./SuggestionsHeader.css";

function SuggestionsHeader({ count }) {
  return (
    <div className="suggestions-header">
      <span className="suggestions-header__count">{count} Suggestions</span>
      <Link to="/add-feedback" className="btn-add-feedback">
        + Add Feedback
      </Link>
    </div>
  );
}

export default SuggestionsHeader;
