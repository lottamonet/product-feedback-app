import { CATEGORIES, CATEGORY_LABELS } from "../constants/categories.js";
import closeIcon from "../assets/icons/mobile/icon-close.svg";
import "./Sidebar.css";

// isOpen/onClose only matter below the mobile breakpoint, where the
// hamburger button in SuggestionsHeader controls this instead of the
// sidebar always being visible. Above that breakpoint, CSS ignores
// isOpen and the sidebar renders normally.
function Sidebar({ activeCategory, onSelectCategory, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar__backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src={closeIcon} alt="" aria-hidden="true" />
        </button>

        <div className="sidebar__brand">
          <h4>My Company</h4>
          <p>Feedback Board</p>
        </div>
        <div className="sidebar__filters">
          <button
            className={`filter-pill ${activeCategory === null ? "filter-pill--active" : ""}`}
            onClick={() => onSelectCategory(null)}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`filter-pill ${activeCategory === category ? "filter-pill--active" : ""}`}
              onClick={() => onSelectCategory(category)}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
