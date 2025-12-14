import { useEffect, useState } from "react";
import api from "../services/api";
import { categoryIcons } from "../utils/categoryIcons";

type Sweet = {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
};

const emptySweet: Partial<Sweet> = {
  name: "",
  category: "",
  description: "",
  price: 0,
  quantity: 0
};

export default function AdminPanel() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [form, setForm] = useState<Partial<Sweet>>(emptySweet);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSweets = () => {
    api.get("/sweets").then(res => setSweets(res.data));
  };

  useEffect(() => {
    loadSweets();
  }, []);

  /* =========================
     ADD / UPDATE
  ========================= */
  const submit = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await api.put(`/sweets/${editingId}`, form);
      } else {
        await api.post("/sweets", form);
      }
      setForm(emptySweet);
      setEditingId(null);
      loadSweets();
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */
  const remove = async (id: string) => {
    if (!confirm("Delete this sweet?")) return;
    await api.delete(`/sweets/${id}`);
    loadSweets();
  };

  /* =========================
     EDIT
  ========================= */
  const edit = (sweet: Sweet) => {
    setEditingId(sweet.id);
    setForm(sweet);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-panel">
      <h2>🛠 Admin Control Panel</h2>
      <p className="admin-subtitle">
        Manage sweets, inventory and pricing
      </p>

      {/* FORM */}
      <div className="admin-form">
        <h3>{editingId ? "✏️ Update Sweet" : "➕ Add New Sweet"}</h3>

        <input
          placeholder="Sweet name"
          value={form.name || ""}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Category (e.g. Chocolate, Gummy)"
          value={form.category || ""}
          onChange={e => setForm({ ...form, category: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description || ""}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price || 0}
          onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity || 0}
          onChange={e => setForm({ ...form, quantity: Number(e.target.value) })}
        />

        <button onClick={submit} disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Sweet" : "Add Sweet"}
        </button>

        {editingId && (
          <button
            className="cancel-btn"
            onClick={() => {
              setForm(emptySweet);
              setEditingId(null);
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* SWEET LIST */}
      <div className="admin-grid">
        {sweets.map(s => {
          const icon =
            categoryIcons[s.category] || categoryIcons.Default;

          return (
            <div className="admin-card" key={s.id}>
              {/* ✅ ICON + NAME */}
              <h4>
                {icon} {s.name}
              </h4>

              <span className="badge">
                {icon} {s.category}
              </span>

              <p>{s.description}</p>
              <p><strong>₹{s.price}</strong></p>
              <p>Stock: {s.quantity}</p>

              <div className="admin-actions">
                <button onClick={() => edit(s)}>✏️ Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => remove(s.id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
