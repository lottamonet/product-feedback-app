import express from "express";
import cors from "cors";
import pkg from "pg";
import config from "./config.js";

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: config.databaseUrl,
});

const VALID_CATEGORIES = ["ui", "ux", "enhancement", "bug", "feature"];

app.get("/get-all-suggestions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suggestions ORDER BY id;");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

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

app.post("/add-one-suggestion", async (req, res) => {
  const { title, category, detail } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title can't be empty" });
  }
  if (title.trim().length > 100) {
    return res.status(400).json({ error: "Title must be 100 characters or fewer" });
  }
  if (!category || !VALID_CATEGORIES.includes(category.toLowerCase())) {
    return res.status(400).json({ error: "Please select a valid category" });
  }
  if (!detail || !detail.trim()) {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
