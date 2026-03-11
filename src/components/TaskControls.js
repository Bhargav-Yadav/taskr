import React from "react";
import { s } from "./styles";

const FILTERS = ["all", "pending", "completed", "overdue"];

export default function TaskControls({ search, setSearch, filter, setFilter, sort, setSort, onNew }) {
  return (
    <div style={styles.wrap}>
      <input
        style={{ ...s.input, maxWidth: 240 }}
        placeholder="🔍  Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.filterGroup}>
        {FILTERS.map((f) => (
          <button
            key={f}
            style={{ ...styles.filterBtn, ...(filter === f ? styles.active : {}) }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <select style={{ ...s.input, width: "auto" }} value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="createdAt">Sort: Newest</option>
        <option value="deadline">Sort: Deadline</option>
        <option value="priority">Sort: Priority</option>
      </select>

      <button style={{ ...s.btn, ...s.btnPrimary, marginLeft: "auto" }} onClick={onNew}>
        + New Task
      </button>
    </div>
  );
}

const styles = {
  wrap: { display: "flex", alignItems: "center", gap: 10, marginBottom: 18, flexWrap: "wrap" },
  filterGroup: { display: "flex", gap: 2, background: "#e5e7eb", borderRadius: 2, padding: 2 },
  filterBtn: { padding: "5px 12px", fontSize: 11, letterSpacing: 1, border: "none", background: "transparent", cursor: "pointer", borderRadius: 1, color: "#6b7280", fontFamily: "inherit" },
  active: { background: "#1a1a2e", color: "#fff" },
};
