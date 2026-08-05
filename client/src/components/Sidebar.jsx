import { CATEGORIES, CATEGORY_LABELS } from "../constants/categories.js";
import "./Sidebar.css";

function Sidebar({ activeCategory, onSelectCategory }) {
  return (
    <aside className="sidebar">
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
  );
}

export default Sidebar;
