export const s = {
  // Buttons
  btn: { padding: "9px 18px", borderRadius: 2, fontSize: 12, letterSpacing: 1.5, cursor: "pointer", border: "none", fontFamily: "inherit", fontWeight: 600, transition: "all 0.15s" },
  btnPrimary: { background: "#1a1a2e", color: "#fff" },
  btnGhost: { background: "transparent", color: "#6b7280", border: "1.5px solid #e5e7eb" },
  btnDanger: { background: "#fee2e2", color: "#dc2626", border: "none" },

  // Form
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 10, letterSpacing: 2, color: "#9ca3af", marginBottom: 5 },
  input: { width: "100%", padding: "9px 12px", border: "1.5px solid #e5e7eb", borderRadius: 2, fontSize: 13, fontFamily: "inherit", outline: "none", background: "#fff", boxSizing: "border-box", color: "#1a1a2e" },
  errorBox: { background: "#fee2e2", color: "#dc2626", padding: "8px 12px", borderRadius: 2, fontSize: 12, marginBottom: 8 },

  // Modal
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 },
  modal: { background: "#fff", borderRadius: 2, padding: "28px 28px 24px", width: "100%", maxWidth: 440, boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  modalTitle: { fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "#1a1a2e" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#9ca3af", fontFamily: "inherit" },

  // Misc
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 14, padding: "2px 6px", borderRadius: 2, fontFamily: "inherit", transition: "color 0.15s" },
};

export const PRIORITY_COLORS = { high: "#ef4444", medium: "#f59e0b", low: "#22c55e" };
export const PRIORITY_LABELS = { high: "HIGH", medium: "MED", low: "LOW" };
