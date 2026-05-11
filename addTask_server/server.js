require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get tasks
app.get("/tasks", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM tasks ORDER BY id DESC"
  );

  res.json(result.rows);
});

// Add task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;

  const result = await pool.query(
    "INSERT INTO tasks(title) VALUES($1) RETURNING *",
    [title]
  );

  res.json(result.rows[0]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});