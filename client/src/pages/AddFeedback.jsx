import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CATEGORY_LABELS } from "../constants/categories.js";
import { addSuggestion } from "../api.js";
import "./AddFeedback.css";

const MAX_TITLE_LENGTH = 100;
const MAX_DETAIL_LENGTH = 500;

// Matches the Figma dropdown order (Feature is the default selection)
const DROPDOWN_CATEGORIES = ["feature", "ui", "ux", "enhancement", "bug"];

function validate({ title, detail }) {
  const errors = {};
  if (!title.trim()) {
    errors.title = "Can't be empty";
  } else if (title.trim().length > MAX_TITLE_LENGTH) {
    errors.title = `Must be ${MAX_TITLE_LENGTH} characters or fewer`;
  }

  if (!detail.trim()) {
    errors.detail = "Can't be empty";
  } else if (detail.trim().length > MAX_DETAIL_LENGTH) {
    errors.detail = `Must be ${MAX_DETAIL_LENGTH} characters or fewer`;
  }

  return errors;
}

function AddFeedback() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(DROPDOWN_CATEGORIES[0]);
  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate({ title, detail });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await addSuggestion({ title: title.trim(), category, detail: detail.trim() });
      navigate("/");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="add-feedback-page">
      <Link to="/" className="go-back-link">
        ‹ Go Back
      </Link>

      <form className="add-feedback-form" onSubmit={handleSubmit} noValidate>
        <div className="add-feedback-form__icon">+</div>
        <h1>Create New Feedback</h1>

        {submitError && <p className="form-error form-error--banner">{submitError}</p>}

        <div className="form-field">
          <label htmlFor="title">Feedback Title</label>
          <p className="form-field__hint">Add a short, descriptive headline</p>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={errors.title ? "input-error" : ""}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <p className="form-field__hint">Choose a category for your feedback</p>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {DROPDOWN_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="detail">Feedback Detail</label>
          <p className="form-field__hint">
            Include any specific comments on what should be improved, added, etc.
          </p>
          <textarea
            id="detail"
            rows={4}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className={errors.detail ? "input-error" : ""}
          />
          {errors.detail && <p className="form-error">{errors.detail}</p>}
        </div>

        <div className="add-feedback-form__actions">
          <Link to="/" className="btn-cancel">
            Cancel
          </Link>
          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFeedback;
