import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { s } from "../components/styles";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const f = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handle = async () => {
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 350));
    const res = mode === "login"
      ? login(form.email, form.password)
      : register(form.name, form.email, form.password);
    if (res.error) setError(res.error);
    setLoading(false);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.card}>
        <div style={styles.logoRow}>
          <span style={styles.logoMark}>◈</span>
          <span style={styles.logoText}>TASKR</span>
        </div>
        <p style={styles.sub}>{mode === "login" ? "Welcome back." : "Create your account."}</p>

        {mode === "register" && (
          <div style={s.field}>
            <label style={s.label}>NAME</label>
            <input style={s.input} value={form.name} onChange={f("name")} placeholder="Your name" />
          </div>
        )}
        <div style={s.field}>
          <label style={s.label}>EMAIL</label>
          <input style={s.input} type="email" value={form.email} onChange={f("email")} placeholder="you@example.com" />
        </div>
        <div style={s.field}>
          <label style={s.label}>PASSWORD</label>
          <input style={s.input} type="password" value={form.password} onChange={f("password")} placeholder="••••••••" />
        </div>

        {error && <div style={s.errorBox}>{error}</div>}

        <button
          style={{ ...s.btn, ...s.btnPrimary, width: "100%", marginTop: 8 }}
          onClick={handle}
          disabled={loading}
        >
          {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <p style={styles.switch}>
          {mode === "login" ? "No account? " : "Have an account? "}
          <span
            style={styles.link}
            onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
          >
            {mode === "login" ? "Register" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrap: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 50%,#16213e 100%)", padding: 16 },
  card: { background: "#fff", borderRadius: 2, padding: "44px 40px", width: "100%", maxWidth: 400, boxShadow: "0 32px 80px rgba(0,0,0,0.4)" },
  logoRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  logoMark: { fontSize: 28, color: "#1a1a2e" },
  logoText: { fontSize: 22, fontWeight: 700, letterSpacing: 6, color: "#1a1a2e" },
  sub: { color: "#6b7280", fontSize: 13, marginBottom: 28, letterSpacing: 0.5 },
  switch: { textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 16 },
  link: { color: "#1a1a2e", cursor: "pointer", fontWeight: 700, textDecoration: "underline" },
};
