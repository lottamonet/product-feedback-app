import { Link } from "react-router-dom";
import hamburgerIcon from "../assets/icons/mobile/icon-hamburger.svg";
import "./SuggestionsHeader.css";

function SuggestionsHeader({ count, sortOrder, onSortChange, onOpenMenu }) {
  return (
    <div className="suggestions-header">
      {/* Only visible below the mobile breakpoint (see CSS) — opens the
          off-canvas Sidebar in place of the category filters normally
          shown alongside the suggestions list. */}
      <button
        type="button"
        className="suggestions-header__menu-btn"
        onClick={onOpenMenu}
        aria-label="Open category filters"
      >
        <img src={hamburgerIcon} alt="" aria-hidden="true" />
      </button>

      <span className="suggestions-header__count">{count} Suggestions</span>

      <select
        className="suggestions-header__sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        aria-label="Sort suggestions"
      >
        <option value="most">Most Upvotes</option>
        <option value="least">Least Upvotes</option>
      </select>

      <Link to="/add-feedback" className="btn-add-feedback">
        + Add Feedback
      </Link>
    </div>
  );
}

export default SuggestionsHeader;
