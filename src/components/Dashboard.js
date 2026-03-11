import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getDeadlineStatus } from "../hooks/useDeadline";

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const overdue = tasks.filter(
    (t) => getDeadlineStatus(t.deadline) === "overdue" && t.status !== "completed"
  ).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const pieData = [
    { name: "Completed", value: completed || 0.001 },
    { name: "Pending", value: pending || 0.001 },
    { name: "Overdue", value: overdue || 0.001 },
  ];

  const stats = [
    { label: "Total", value: total, color: "#1a1a2e" },
    { label: "Completed", value: completed, color: "#22c55e" },
    { label: "Pending", value: pending, color: "#f59e0b" },
    { label: "Overdue", value: overdue, color: "#ef4444" },
  ];

  return (
    <div style={styles.grid}>
      {stats.map((stat) => (
        <div key={stat.label} style={{ ...styles.card, borderTop: `3px solid ${stat.color}` }}>
          <div style={{ ...styles.num, color: stat.color }}>{stat.value}</div>
          <div style={styles.lbl}>{stat.label.toUpperCase()}</div>
        </div>
      ))}

      <div style={{ ...styles.card, gridColumn: "span 2" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={styles.lbl}>PROGRESS</div>
            <div style={styles.bar}>
              <div style={{ ...styles.fill, width: `${pct}%` }} />
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>{pct}% complete</div>
          </div>
          <div style={{ width: 80, height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={22} outerRadius={38} dataKey="value" strokeWidth={0}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip formatter={(v, n) => [v === 0.001 ? 0 : v, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr) repeat(2, 1fr)", gap: 12, marginBottom: 28 },
  card: { background: "#fff", borderRadius: 2, padding: "16px 18px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  num: { fontSize: 28, fontWeight: 700, lineHeight: 1 },
  lbl: { fontSize: 10, letterSpacing: 2, color: "#9ca3af", marginTop: 4 },
  bar: { height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden", marginTop: 10 },
  fill: { height: "100%", background: "linear-gradient(90deg,#1a1a2e,#4a5568)", borderRadius: 3, transition: "width 0.6s ease" },
};
