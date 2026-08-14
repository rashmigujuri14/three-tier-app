import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      setTitle("");
      loadTasks();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });

      loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const toggleTask = async (task) => {
    try {
      await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <div className="container">

        <div className="header">
          <div className="header-icon">✓</div>

          <div>
            <h1>My Tasks</h1>
            <p>Stay organized. Get things done.</p>
          </div>
        </div>

        <div className="stats">
          <div>
            <strong>{tasks.length}</strong>
            <span>Total Tasks</span>
          </div>

          <div>
            <strong>{completedCount}</strong>
            <span>Completed</span>
          </div>

          <div>
            <strong>{tasks.length - completedCount}</strong>
            <span>Pending</span>
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />

          <button onClick={addTask}>
            <span>+</span>
            Add Task
          </button>
        </div>

        <div className="section-title">
          <h2>Your Tasks</h2>
          <span>{tasks.length} items</span>
        </div>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✓</div>
              <h3>No tasks yet</h3>
              <p>Add your first task above.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                className={`task ${task.completed ? "task-done" : ""}`}
                key={task._id}
              >
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task)}
                  />
                  <span className="custom-checkbox"></span>
                </label>

                <span className="task-title">
                  {task.title}
                </span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(task._id)}
                  title="Delete task"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        <div className="footer">
          <span>Three-Tier To-Do App</span>
          <span>•</span>
          <span>Powered by React</span>
        </div>

      </div>
    </div>
  );
}

export default App;
