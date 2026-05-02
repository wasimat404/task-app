import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    due_date: ""
  });

  // 🔥 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/today");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔥 Create task
  const createTask = async () => {
    if (!form.title || !form.due_date) {
      alert("Title and Date required");
      return;
    }

    try {
      await axios.post("/tasks", form);
      setForm({ title: "", description: "", link: "", due_date: "" });
      fetchTasks(); // ✅ no reload
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // 🔥 Actions
  const markDone = async (id) => {
    try {
      await axios.put(`/tasks/${id}/done`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const markSkip = async (id) => {
    try {
      await axios.put(`/tasks/${id}/skip`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a1a1a, #000000)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      color: "#fff",
      fontFamily: "Arial"
    }}>

      {/* 🔥 HERO */}
      <h1 style={{
        fontSize: "80px",
        fontWeight: "900",
        letterSpacing: "10px",
        textShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.2)"
      }}>
        DO IT
      </h1>

      {/* 🔥 FORM */}
      <div style={{
        marginBottom: "20px",
        background: "rgba(255,255,255,0.05)",
        padding: "15px",
        borderRadius: "10px"
      }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          placeholder="Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm({ ...form, due_date: e.target.value })}
        />

        <br /><br />

        <button onClick={createTask}>➕ Add Task</button>
      </div>

      {/* 🔥 CARDS */}
      {tasks.length === 0 ? (
        <p>No tasks for today</p>
      ) : (
        <div style={{
          position: "relative",
          width: "320px",
          height: "420px"
        }}>
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 120) markDone(task.id);
                if (info.offset.x < -120) markSkip(task.id);
              }}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                color: "#333",
                borderRadius: "20px",
                padding: "20px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
                transform: `translateY(${index * 10}px) scale(${1 - index * 0.05})`,
                zIndex: tasks.length - index,
                cursor: "grab"
              }}
            >
              <h2>{task.title}</h2>
              <p>{task.description}</p>

              {task.link && (
                <a href={task.link} target="_blank" rel="noreferrer">
                  🔗 Open
                </a>
              )}

              <div style={{ marginTop: "20px" }}>
                <button onClick={() => markDone(task.id)}>👉 Done</button>
                <button onClick={() => markSkip(task.id)}>👈 Skip</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;