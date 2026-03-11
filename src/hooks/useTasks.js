import { useState, useEffect } from "react";
import { DB } from "../services/storage";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userId) {
      const all = DB.getTasks();
      setTasks(all.filter((t) => t.userId === userId));
    }
  }, [userId]);

  const persist = (updated) => {
    const others = DB.getTasks().filter((t) => t.userId !== userId);
    DB.saveTasks([...others, ...updated]);
    setTasks(updated);
  };

  const addTask = (data) => {
    const task = {
      id: generateId(),
      userId,
      status: "pending",
      createdAt: new Date().toISOString(),
      ...data,
    };
    persist([...tasks, task]);
  };

  const updateTask = (id, data) =>
    persist(tasks.map((t) => (t.id === id ? { ...t, ...data } : t)));

  const deleteTask = (id) => persist(tasks.filter((t) => t.id !== id));

  const toggleStatus = (id) => {
    const task = tasks.find((t) => t.id === id);
    updateTask(id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  };

  return { tasks, addTask, updateTask, deleteTask, toggleStatus };
}
