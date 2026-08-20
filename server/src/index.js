import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "pg";

// pg ships as CommonJS, so under "type": "module" we import the whole
// package and destructure Pool from it — `import { Pool } from "pg"` does
// not work here.
const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Was previously a gitignored server/src/config.js — that worked locally
// but meant the file (and the DB credentials in it) simply didn't exist
// when Render cloned the repo from GitHub, crashing the server on startup.
// Environment variables (set in Render's dashboard for prod, .env locally)
// are the standard fix: the secret never has to be a file in the repo at all.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Restricts the API to only the actual frontend origin instead of allowing
// any website to call it — FRONTEND_ORIGIN is set to the real Netlify URL
// in Render's environment variables once deployed (see Milestone 9).
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
// Lets us read JSON bodies (e.g. the AddFeedback form submission) via req.body.
app.use(express.json());

// A connection pool (not a single client) so multiple requests can run
// queries concurrently without waiting on each other.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Single source of truth for valid categories — used to validate both the
// :category route param and the category field on new suggestions.
const VALID_CATEGORIES = ["ui", "ux", "enhancement", "bug", "feature"];

// Returns every suggestion, unfiltered. SELECT * (not an explicit column
// list) is a deliberate choice here: this table only backs this one API,
// so any column we add later should just flow through automatically.
app.get("/get-all-suggestions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suggestions ORDER BY id;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// Returns suggestions in a single category. Category comes from the URL
// (not the DB) so we validate it against VALID_CATEGORIES before querying —
// this also protects against SQL injection via the route param, on top of
// the parameterized query below.
app.get("/get-suggestions-by-category/:category", async (req, res) => {
  const category = req.params.category.toLowerCase();

  if (!VALID_CATEGORIES.includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM suggestions WHERE category = $1 ORDER BY id;",
      [category]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

// Creates a new suggestion. Validation here mirrors the frontend form's
// validation, but this copy is the one that actually matters for security —
// the frontend check only stops a well-behaved browser, not a direct API
// call from curl/Postman/an attacker.
app.post("/add-one-suggestion", async (req, res) => {
  // req.body can be undefined (missing/wrong Content-Type) or have non-string
  // fields (e.g. a number) — check types before calling .trim() on anything,
  // since .trim() on a non-string throws and a bare {} body would otherwise
  // crash the destructure itself.
  const { title, category, detail } = req.body || {};

  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title can't be empty" });
  }
  if (title.trim().length > 100) {
    return res.status(400).json({ error: "Title must be 100 characters or fewer" });
  }
  if (typeof category !== "string" || !VALID_CATEGORIES.includes(category.toLowerCase())) {
    return res.status(400).json({ error: "Please select a valid category" });
  }
  if (typeof detail !== "string" || !detail.trim()) {
    return res.status(400).json({ error: "Detail can't be empty" });
  }
  if (detail.trim().length > 500) {
    return res.status(400).json({ error: "Detail must be 500 characters or fewer" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO suggestions (title, category, detail) VALUES ($1, $2, $3) RETURNING *;",
      [title.trim(), category.toLowerCase(), detail.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add suggestion" });
  }
});

// Upvote stretch goal: increments one suggestion's upvote count by 1 and
// returns the updated row so the frontend can update its list without a
// full re-fetch. The increment happens in SQL ("upvotes + 1"), not by
// reading the count in JS and writing count+1 back — that avoids a race
// condition if two upvotes land at nearly the same time.
app.post("/upvote-suggestion/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid suggestion id" });
  }

  try {
    const result = await pool.query(
      "UPDATE suggestions SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Suggestion not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upvote suggestion" });
  }
});

// Catches anything thrown/rejected in a route handler above (including
// express.json()'s own SyntaxError on malformed JSON bodies) and returns
// clean JSON instead of Express's default HTML error page, which otherwise
// leaks the server's file paths and full stack trace to the client.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Request body must be valid JSON" });
  }

  res.status(err.status || 500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
