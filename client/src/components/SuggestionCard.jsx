import { CATEGORY_LABELS, CATEGORY_COLORS } from "../constants/categories.js";
import "./SuggestionCard.css";

function SuggestionCard({ suggestion }) {
  const colors = CATEGORY_COLORS[suggestion.category];

  return (
    <article className="suggestion-card">
      <h3 className="suggestion-card__title">{suggestion.title}</h3>
      <p className="suggestion-card__detail">{suggestion.detail}</p>
      <span
        className="suggestion-card__tag"
        style={{ backgroundColor: colors.bg, color: colors.text }}
      >
        {CATEGORY_LABELS[suggestion.category]}
      </span>
    </article>
  );
}

export default SuggestionCard;
