# Product Feedback App — Product Requirements Document (PRD)

## 1. Overview

**What:** A full-stack Product Feedback application for a startup ("My Company") where customers can view existing product suggestions and submit new ones for how the product could be improved.

**Who it's for:** My Company's customers (submitting/browsing feedback) and My Company's product team (reading feedback to prioritize roadmap work — not built in this version, but frames why filtering by category matters).

**Core value:** A single, centralized place to collect and browse product feedback, organized by category, so nothing gets lost in email/Slack.

---

## 2. Pages & User Flows

### 2.1 Home page (`/`)

- On load, fetch and display **all suggestions** via `GET /get-all-suggestions`.
- Each suggestion card shows: title, category tag, detail/description text, upvote count (display only — upvoting is out of scope, see §7).
- Default sort: no required sort order for MVP (stretch: sort by most upvotes).
- **Category filter bar**: buttons for `All`, `UI`, `UX`, `Enhancement`, `Bug`, `Feature`.
  - Clicking a category button calls `GET /get-suggestions-by-category/:category` and re-renders the list with only matching suggestions.
  - Clicking `All` re-fetches `GET /get-all-suggestions`.
  - The active filter button is visually distinguished (e.g. filled/highlighted state) from inactive ones.
  - Filter state does not need to persist across page refresh (resets to `All`) for MVP.
- **Empty state**: if the currently selected filter returns zero suggestions, hide the list and show the "There is no feedback" screen instead:
  - Illustration (`illustration-empty.svg`, already in `client/src/assets/suggestions`)
  - Heading: "There is no feedback yet."
  - Body copy: "Got a suggestion? Share it to help us improve our product."
  - A button/link to the AddFeedback page.
- A visible "+ Add Feedback" button/link on the Home page navigates to `/add-feedback` (uses React Router).

### 2.2 AddFeedback page (`/add-feedback`)

- A form with these fields:
  | Field | Input type | Required | Notes |
  |---|---|---|---|
  | Title | text input | Yes | Short summary, e.g. "Add tags for solutions" |
  | Category | select dropdown | Yes | Options: `UI`, `UX`, `Enhancement`, `Bug`, `Feature` |
  | Detail | textarea | Yes | Longer description of the suggestion |
- **Validation rules** (client-side, mirrored server-side — see §5):
  - Title: required, non-empty after trimming whitespace, max 100 characters.
  - Category: required — must be one of the 5 valid enum values; form cannot submit with the placeholder/unselected option.
  - Detail: required, non-empty after trimming whitespace, max 500 characters.
  - On submit with invalid fields: **do not** call the API. Show an inline error message directly below each invalid field (e.g. "Can't be empty" for Title/Detail, "Please select a category" for Category). Fields are validated on submit; re-validate on change once a field has already been marked invalid once.
- On valid submit: call `POST /add-one-suggestion` with `{ title, category, detail }`.
  - On success (2xx): navigate back to the Home page and show the new suggestion in the (unfiltered) list.
  - On failure (network/server error): show a single non-blocking error message near the top of the form (e.g. "Something went wrong — please try again.") and keep the user's entered data in the form so they don't lose it.
- A "Cancel" / back link returns to the Home page without submitting.

### 2.3 Responsive behavior

- Must render cleanly at mobile (375px), tablet (768px), and desktop (1440px) widths per the Figma file.
- Category filter bar wraps or scrolls appropriately on narrow viewports (exact mobile filter treatment — inline wrap vs. scroll — to be finalized against Figma during Milestone 7; hamburger-menu nav is a stretch goal, not required for MVP).

---

## 3. Data Model

Single table: `suggestions`

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` | Auto-incrementing suggestion ID |
| `title` | `VARCHAR(100)` | `NOT NULL` | Suggestion title |
| `category` | `VARCHAR(20)` | `NOT NULL`, `CHECK (category IN ('ui','ux','enhancement','bug','feature'))` | Stored lowercase; display-formatted (e.g. "UI", "UX") in the frontend |
| `detail` | `VARCHAR(500)` | `NOT NULL` | Full suggestion description |
| `upvotes` | `INTEGER` | `NOT NULL DEFAULT 0` | Display-only for MVP; upvoting endpoint is out of scope |
| `created_at` | `TIMESTAMP` | `NOT NULL DEFAULT NOW()` | For potential future sorting by newest |

**Sample data:** insert at least 3 rows spanning at least 2 different categories (e.g. one `ui`, one `feature`, one `bug`) so the empty-state and filtering behavior can both be verified immediately after seeding.

---

## 4. API Endpoints

Base URL (once deployed): `https://REPLACE-THIS-WITH-YOUR-DEPLOYED-URL.onrender.com`

### `GET /get-all-suggestions`

**Description:** Returns every suggestion in the database, unfiltered.

**Example Request URL:**
```
GET /get-all-suggestions
```

**Example Response:** `200 OK`, array of suggestion objects
```json
[
  {
    "id": 1,
    "title": "Add tags for solutions",
    "category": "enhancement",
    "detail": "Easier to search for solutions based on a specific stack.",
    "upvotes": 6,
    "created_at": "2026-07-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Add a dark theme option",
    "category": "feature",
    "detail": "It would help people with light sensitivities and who prefer dark mode.",
    "upvotes": 9,
    "created_at": "2026-07-02T09:30:00.000Z"
  }
]
```

### `GET /get-suggestions-by-category/:category`

**Description:** Returns suggestions filtered to a single category. `:category` must be one of `ui`, `ux`, `enhancement`, `bug`, `feature` (case-insensitive from the client; normalize to lowercase server-side).

**Example Request URL:**
```
GET /get-suggestions-by-category/bug
```

**Example Response:** `200 OK`, array of suggestion objects (same shape as above), filtered to matching category. Returns `[]` (empty array, not an error) if no suggestions match — this is what powers the empty-state screen.

**Error case:** if `:category` is not one of the 5 valid values, return `400 Bad Request` with `{ "error": "Invalid category" }`.

### `POST /add-one-suggestion`

**Description:** Creates a new suggestion.

**Example Request URL:**
```
POST /add-one-suggestion
```

**Example Request Body:**
```json
{
  "title": "Add tags for solutions",
  "category": "enhancement",
  "detail": "Easier to search for solutions based on a specific stack."
}
```

**Example Response:** `201 Created`, the newly created suggestion object (including generated `id`, default `upvotes: 0`, and `created_at`)
```json
{
  "id": 7,
  "title": "Add tags for solutions",
  "category": "enhancement",
  "detail": "Easier to search for solutions based on a specific stack.",
  "upvotes": 0,
  "created_at": "2026-08-05T14:22:10.000Z"
}
```

**Error case:** if `title`, `category`, or `detail` is missing/empty, or `category` is not a valid enum value, return `400 Bad Request` with `{ "error": "<field>-specific message" }`. This server-side validation must exist independent of frontend validation (see security audit, Milestone 8).

---

## 5. Tech Stack & Deployment Targets

| Layer | Tech | Deploy target |
|---|---|---|
| Frontend | React (Vite), React Router | Netlify |
| Server/API | Node.js, Express | Render |
| Database | PostgreSQL | Neon (project name: `suggestions`) |
| API testing | Postman | — |

CORS on the Express server must be scoped to the deployed Netlify origin (not left wide open) once the frontend URL is known.

---

## 6. Design Reference

- [Figma file](https://www.figma.com/design/vxjX8SdBOt21DCD14mrBM9/Product-Feedback-App-Design) — source of truth for spacing, color, typography, and responsive breakpoints (mobile/tablet/desktop).
- Existing icon/image assets already scaffolded in `client/src/assets` (arrows for upvote, plus/new-feedback icons, empty-state illustration, category-suggestion icon, mobile hamburger/close icons) — reuse these rather than sourcing new ones.
- Category tag colors and empty-state copy should match Figma exactly; if Figma and this PRD ever disagree, Figma wins for visual details and this PRD wins for data/behavior.

---

## 7. Out of Scope (MVP)

Explicitly **not** building in this version — these exist as icon assets/stretch goals but must not be implemented unless time remains after all required milestones:

- Upvoting suggestions (clicking to increment `upvotes`)
- Commenting on suggestions
- Editing an existing suggestion
- Deleting an existing suggestion
- A suggestion detail page (separate from the Home list)
- Sorting controls (most/least upvotes, most/least comments)
- Multi-select category filtering (only single-category-at-a-time filtering is required)
- Hamburger mobile navigation menu
- User authentication/accounts

---

## 8. Open Questions / Assumptions Log

- Assuming category values are stored lowercase in the DB and title-cased only at render time — confirm this doesn't conflict with Figma's exact tag styling.
- Assuming no pagination is needed for MVP (suggestion volume is small/demo-scale).
- Exact mobile filter-bar layout (wrap vs. horizontal scroll) deferred to Milestone 7 UI-fidelity pass against Figma.
