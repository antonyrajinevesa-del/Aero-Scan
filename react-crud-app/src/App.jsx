import { useState } from "react";
import config from "./config.js";

const { title, itemName, fields, seed } = config;

const emptyForm = () =>
  Object.fromEntries(fields.map((f) => [f.name, f.type === "select" ? f.options[0] : ""]));

// Inline styles only - no CSS file needed
const s = {
  page: { fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "20px auto", padding: 16 },
  card: { border: "1px solid #ccc", borderRadius: 8, padding: 16, marginBottom: 16 },
  row: { display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" },
  input: { padding: 8, border: "1px solid #999", borderRadius: 4, minWidth: 140 },
  btn: { padding: "8px 14px", border: "none", borderRadius: 4, cursor: "pointer", background: "#2563eb", color: "#fff" },
  btnGray: { padding: "8px 14px", border: "none", borderRadius: 4, cursor: "pointer", background: "#6b7280", color: "#fff" },
  btnRed: { padding: "6px 10px", border: "none", borderRadius: 4, cursor: "pointer", background: "#dc2626", color: "#fff" },
  btnGreen: { padding: "6px 10px", border: "none", borderRadius: 4, cursor: "pointer", background: "#16a34a", color: "#fff" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", background: "#f3f4f6", padding: 8, border: "1px solid #ddd" },
  td: { padding: 8, border: "1px solid #ddd" },
};

export default function App() {
  const [items, setItems] = useState(() => seed.map((r, i) => ({ id: i + 1, ...r })));
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);
  const [query, setQuery] = useState("");
  const [nextId, setNextId] = useState(seed.length + 1);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE + UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId === null) {
      setItems([...items, { id: nextId, ...form }]);
      setNextId(nextId + 1);
    } else {
      setItems(items.map((it) => (it.id === editId ? { ...it, ...form } : it)));
      setEditId(null);
    }
    setForm(emptyForm());
  };

  // READ one into form for editing
  const handleEdit = (item) => {
    setEditId(item.id);
    const { id, ...rest } = item;
    setForm(rest);
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(emptyForm());
  };

  // DELETE
  const handleDelete = (id) => {
    if (!window.confirm(`Delete this ${itemName}?`)) return;
    setItems(items.filter((it) => it.id !== id));
    if (editId === id) handleCancel();
  };

  // SEARCH across all fields
  const q = query.trim().toLowerCase();
  const visible = items.filter(
    (it) => !q || fields.some((f) => String(it[f.name] ?? "").toLowerCase().includes(q))
  );

  return (
    <div style={s.page}>
      <h1>{title}</h1>

      <form onSubmit={handleSubmit} style={s.card}>
        <h3 style={{ marginTop: 0 }}>{editId === null ? `Add ${itemName}` : `Edit ${itemName}`}</h3>
        <div style={s.row}>
          {fields.map((f) =>
            f.type === "select" ? (
              <select key={f.name} name={f.name} value={form[f.name]} onChange={handleChange} style={s.input}>
                {f.options.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                key={f.name}
                name={f.name}
                type={f.type}
                placeholder={f.label}
                value={form[f.name]}
                onChange={handleChange}
                required={f.required}
                style={s.input}
              />
            )
          )}
          <button type="submit" style={s.btn}>{editId === null ? "Add" : "Update"}</button>
          {editId !== null && (
            <button type="button" onClick={handleCancel} style={s.btnGray}>Cancel</button>
          )}
        </div>
      </form>

      <div style={s.card}>
        <div style={{ ...s.row, marginBottom: 12 }}>
          <input
            placeholder={`Search ${itemName.toLowerCase()}s...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ ...s.input, flex: 1 }}
          />
          <span>{visible.length} / {items.length}</span>
        </div>

        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>#</th>
              {fields.map((f) => (
                <th key={f.name} style={s.th}>{f.label}</th>
              ))}
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td style={s.td} colSpan={fields.length + 2}>No records found</td>
              </tr>
            ) : (
              visible.map((it) => (
                <tr key={it.id}>
                  <td style={s.td}>{it.id}</td>
                  {fields.map((f) => (
                    <td key={f.name} style={s.td}>{it[f.name]}</td>
                  ))}
                  <td style={s.td}>
                    <button onClick={() => handleEdit(it)} style={s.btnGreen}>Edit</button>{" "}
                    <button onClick={() => handleDelete(it.id)} style={s.btnRed}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
