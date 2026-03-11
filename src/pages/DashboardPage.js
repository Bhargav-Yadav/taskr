import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import { getDeadlineStatus } from "../hooks/useDeadline";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import TaskControls from "../components/TaskControls";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, addTask, updateTask, deleteTask, toggleStatus } = useTasks(user?.id);

  const [modal, setModal] = useState(null); // null | "new" | task object
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");

  const filtered = tasks
    .filter((t) => {
      if (filter === "pending") return t.status === "pending";
      if (filter === "completed") return t.status === "completed";
      if (filter === "overdue") return getDeadlineStatus(t.deadline) === "overdue" && t.status !== "completed";
      return true;
    })
    .filter((t) =>
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "deadline") return (a.deadline || "9999") < (b.deadline || "9999") ? -1 : 1;
      if (sort === "priority") {
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.priority] - order[b.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const handleSave = (data) => {
    if (modal === "new") addTask(data);
    else updateTask(modal.id, data);
    setModal(null);
  };

  return (
    <div style={styles.wrap}>
      <Header />
      <main style={styles.main}>
        <Dashboard tasks={tasks} />

        <TaskControls
          search={search} setSearch={setSearch}
          filter={filter} setFilter={setFilter}
          sort={sort} setSort={setSort}
          onNew={() => setModal("new")}
        />

        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>◈</div>
            <div style={styles.emptyText}>
              {tasks.length === 0 ? "No tasks yet. Create your first one!" : "No tasks match your filter."}
            </div>
          </div>
        ) : (
          <div style={styles.list}>
            {filtered.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onToggle={toggleStatus}
                onEdit={(t) => setModal(t)}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {modal && (
        <TaskModal
          initial={modal === "new" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", background: "#f8f7f4" },
  main: { maxWidth: 860, margin: "0 auto", padding: "28px 20px" },
  list: { display: "flex", flexDirection: "column", gap: 8 },
  empty: { textAlign: "center", padding: "64px 20px", color: "#9ca3af" },
  emptyIcon: { fontSize: 40, marginBottom: 12, opacity: 0.3 },
  emptyText: { fontSize: 13, letterSpacing: 1 },
};
