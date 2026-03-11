export function getDeadlineStatus(deadline) {
  if (!deadline) return "none";
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  due.setHours(0, 0, 0, 0);
  if (due < now) return "overdue";
  if (due.getTime() === now.getTime()) return "today";
  const diff = (due - now) / (1000 * 60 * 60 * 24);
  if (diff <= 3) return "soon";
  return "ok";
}

export const DEADLINE_STYLES = {
  overdue: { bg: "#fee2e2", color: "#dc2626", icon: "⚠", label: "Overdue · " },
  today:   { bg: "#fef3c7", color: "#d97706", icon: "⏰", label: "Due today · " },
  soon:    { bg: "#ecfccb", color: "#16a34a", icon: "📅", label: "" },
  ok:      { bg: "transparent", color: "#6b7280", icon: "📅", label: "" },
  none:    { bg: "transparent", color: "#6b7280", icon: "", label: "" },
};
