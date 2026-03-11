import React from "react";
import { getDeadlineStatus, DEADLINE_STYLES } from "../hooks/useDeadline";
import { s, PRIORITY_COLORS, PRIORITY_LABELS } from "./styles";

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const ds = getDeadlineStatus(task.deadline);
  const dl = DEADLINE_STYLES[ds];
  const isDone = task.status === "completed";

  return (
    <div style={{ ...styles.card, opacity: isDone ? 0.6 : 1 }}>
      <div style={styles.top}>
        {/* Checkbox */}
        <button
          style={{ ...styles.check, background: isDone ? "#1a1a2e" : "transparent", borderColor: isDone ? "#1a1a2e" : "#d1d5db" }}
          onClick={() => onToggle(task.id)}
        >
          {isDone && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={styles.titleRow}>
            <span style={{ ...styles.title, textDecoration: isDone ? "line-through" : "none" }}>{task.title}</span>
            <span style={{ ...styles.badge, background: PRIORITY_COLORS[task.priority] + "22", color: PRIORITY_COLORS[task.priority], borderColor: PRIORITY_COLORS[task.priority] + "44" }}>
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
          {task.description && <p style={styles.desc}>{task.description}</p>}
          <div style={styles.meta}>
            {task.category && <span style={styles.category}>{task.category}</span>}
            {task.deadline && (
              <span style={{ ...styles.deadline, background: dl.bg, color: dl.color }}>
                {dl.icon} {dl.label}
                {new Date(task.deadline + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button style={s.iconBtn} onClick={() => onEdit(task)} title="Edit">✎</button>
          <button style={{ ...s.iconBtn, color: "#ef4444" }} onClick={() => onDelete(task.id)} title="Delete">✕</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: { background: "#fff", borderRadius: 2, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "opacity 0.2s" },
  top: { display: "flex", alignItems: "flex-start", gap: 12 },
  check: { width: 20, height: 20, border: "2px solid", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, transition: "all 0.2s" },
  titleRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  title: { fontSize: 14, fontWeight: 600, color: "#1a1a2e" },
  desc: { fontSize: 12, color: "#6b7280", marginTop: 3, lineHeight: 1.5 },
  meta: { display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap", alignItems: "center" },
  badge: { fontSize: 10, letterSpacing: 1, padding: "2px 7px", borderRadius: 2, border: "1px solid", fontWeight: 700 },
  category: { fontSize: 11, background: "#f3f4f6", color: "#374151", padding: "2px 8px", borderRadius: 2 },
  deadline: { fontSize: 11, padding: "2px 8px", borderRadius: 2, fontWeight: 600 },
};
