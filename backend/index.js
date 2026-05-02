const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * TEST DB CONNECTION
 */
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).send("DB connection failed");
  }
});

/**
 * CREATE TASK
 */
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, link, due_date } = req.body;

    // ✅ validation
    if (!title || !due_date) {
      return res.status(400).json({ error: "Title and due_date required" });
    }

    const newTask = await pool.query(
      `INSERT INTO tasks 
       (title, description, link, due_date, status) 
       VALUES ($1, $2, $3, $4, 'pending') 
       RETURNING *`,
      [
        title,
        description || null,
        link || null,
        due_date
      ]
    );

    res.json(newTask.rows[0]);

  } catch (err) {
    console.error("POST ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/**
 * GET TODAY TASKS
 */
app.get("/tasks/today", async (req, res) => {
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE due_date = CURRENT_DATE AND status='pending'"
    );

    res.json(tasks.rows);

  } catch (err) {
    console.error("GET ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/**
 * MARK DONE
 */
app.put("/tasks/:id/done", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE tasks SET status='done' WHERE id=$1",
      [id]
    );

    res.json({ message: "Task marked as done" });

  } catch (err) {
    console.error("DONE ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/**
 * MARK SKIPPED
 */
app.put("/tasks/:id/skip", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE tasks SET status='skipped' WHERE id=$1",
      [id]
    );

    res.json({ message: "Task skipped" });

  } catch (err) {
    console.error("SKIP ERROR:", err.message);
    res.status(500).send("Server error");
  }
});

/**
 * START SERVER
 */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});