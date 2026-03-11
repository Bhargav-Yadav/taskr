import React from "react";
import { useAuth } from "../context/AuthContext";
import { s } from "./styles";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <span style={styles.logo}>◈ TASKR</span>
        <span style={styles.greeting}>Hello, {user?.name}</span>
      </div>
      <button style={{ ...s.btn, ...s.btnGhost, color: "#94a3b8", borderColor: "#2d3748" }} onClick={logout}>
        Sign Out
      </button>
    </header>
  );
}

const styles = {
  header: { background: "#1a1a2e", color: "#fff", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 20px rgba(0,0,0,0.15)" },
  left: { display: "flex", alignItems: "center", gap: 20 },
  logo: { fontSize: 16, fontWeight: 700, letterSpacing: 5, color: "#fff" },
  greeting: { fontSize: 12, color: "#94a3b8", letterSpacing: 1 },
};
