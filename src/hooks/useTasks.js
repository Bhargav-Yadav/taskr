import { useState, useEffect } from "react";
import { request } from "../services/storage";

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
    const res = await request("/tasks");
    if (Array.isArray(res)) setTasks(res);
  };

  const addTask = async (data) => {
    const res = await request("/tasks", "POST", data);
    if (res._id) setTasks((prev) => [res, ...prev]);
  };

  const updateTask = async (id, data) => {
    const res = await request(`/tasks/${id}`, "PUT", data);
    if (res._id) setTasks((prev) => prev.map((t) => (t.id === id ? res : t)));
  };

  const deleteTask = async (id) => {
    await request(`/tasks/${id}`, "DELETE");
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleStatus = async (id) => {
    const task = tasks.find((t) => t._id === id);
    await updateTask(id, { status: task.status === "completed" ? "pending" : "completed" });
  };

  return { tasks, addTask, updateTask, deleteTask, toggleStatus };
}