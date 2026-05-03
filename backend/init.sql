CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  title       TEXT   NOT NULL,
  description TEXT,
  link        TEXT,
  due_date    DATE   NOT NULL,
  status      TEXT   NOT NULL DEFAULT 'pending'
);
