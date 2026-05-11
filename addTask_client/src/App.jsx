import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // YOUR RENDER URL
  const API = "https://addtask-b0qr.onrender.com/";

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(`${API}/tasks`, {
        title,
      });

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Task Manager
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Enter task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={addTask}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <div>
          {tasks.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "gray",
              }}
            >
              No tasks added yet
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  background: "#f8fafc",
                  padding: "14px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                {task.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;