import React, { useState } from "react";
import { s } from "./styles";

export default function TaskModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || { title: "", description: "", priority: "medium", deadline: "", category: "" }
  );

  const f = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <div style={s.modalHeader}>
          <span style={s.modalTitle}>{initial ? "EDIT TASK" : "NEW TASK"}</span>
          <button style={s.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={s.field}>
          <label style={s.label}>TITLE *</label>
          <input style={s.input} value={form.title} onChange={f("title")} placeholder="What needs to be done?" />
        </div>

        <div style={s.field}>
          <label style={s.label}>DESCRIPTION</label>
          <textarea
            style={{ ...s.input, height: 72, resize: "none" }}
            value={form.description}
            onChange={f("description")}
            placeholder="Optional details..."
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ ...s.field, flex: 1 }}>
            <label style={s.label}>PRIORITY</label>
            <select style={s.input} value={form.priority} onChange={f("priority")}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div style={{ ...s.field, flex: 1 }}>
            <label style={s.label}>CATEGORY</label>
            <input style={s.input} value={form.category} onChange={f("category")} placeholder="e.g. Work, Personal" />
          </div>
        </div>

        <div style={s.field}>
          <label style={s.label}>DEADLINE</label>
          <input style={s.input} type="date" value={form.deadline} onChange={f("deadline")} />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button style={{ ...s.btn, ...s.btnGhost, flex: 1 }} onClick={onClose}>Cancel</button>
          <button
            style={{ ...s.btn, ...s.btnPrimary, flex: 2 }}
            onClick={() => { if (form.title.trim()) onSave(form); }}
          >
            {initial ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
