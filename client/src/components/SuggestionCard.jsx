import { CATEGORY_LABELS, CATEGORY_COLORS } from "../constants/categories.js";
import arrowUpIcon from "../assets/icons/icon-arrow-up.svg";
import "./SuggestionCard.css";

function SuggestionCard({ suggestion, onUpvote }) {
  const colors = CATEGORY_COLORS[suggestion.category];

  return (
    <article className="suggestion-card">
      <button
        type="button"
        className="suggestion-card__upvote"
        onClick={() => onUpvote(suggestion.id)}
        aria-label={`Upvote "${suggestion.title}", currently ${suggestion.upvotes} votes`}
      >
        <img src={arrowUpIcon} alt="" aria-hidden="true" />
        <span>{suggestion.upvotes}</span>
      </button>

      <div className="suggestion-card__body">
        <h3 className="suggestion-card__title">{suggestion.title}</h3>
        <p className="suggestion-card__detail">{suggestion.detail}</p>
        <span
          className="suggestion-card__tag"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {CATEGORY_LABELS[suggestion.category]}
        </span>
      </div>
    </article>
  );
}

export default SuggestionCard;
