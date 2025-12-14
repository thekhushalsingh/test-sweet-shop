import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SweetCard from "../components/SweetCard";
import { AuthContext } from "../context/AuthContext";
import { categoryIcons } from "../utils/categoryIcons";

type Sweet = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
};

export default function Dashboard() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/sweets").then(res => setSweets(res.data));
  }, []);

  /* =========================
     FILTERED SWEETS
  ========================= */
  const filteredSweets = useMemo(() => {
    return sweets.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "ALL" || s.category === category)
    );
  }, [sweets, search, category]);

  /* =========================
     GROUP BY CATEGORY
  ========================= */
  const grouped = useMemo(() => {
    return filteredSweets.reduce((acc: Record<string, Sweet[]>, sweet) => {
      acc[sweet.category] = acc[sweet.category] || [];
      acc[sweet.category].push(sweet);
      return acc;
    }, {});
  }, [filteredSweets]);

  const categories = Array.from(
    new Set(sweets.map(s => s.category))
  );

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>🍬 Sweet Dashboard</h2>

        <div className="dashboard-actions">
          <button onClick={() => navigate(-1)}>⬅ Back</button>
          <button className="logout-btn" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="filter-bar">
        <input
          placeholder="🔍 Search sweets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* CATEGORY SECTIONS */}
      {Object.keys(grouped).length === 0 && (
        <p className="empty-text">No sweets found 🍭</p>
      )}

      {Object.entries(grouped).map(([cat, items]) => (
        <section key={cat} className="category-section">
          {/* ✅ UPDATED: CATEGORY ICON + NAME */}
          <h3 className="category-title">
            {categoryIcons[cat] || categoryIcons.Default} {cat}
          </h3>

          <div className="grid">
            {(items as Sweet[]).map(s => (
              <SweetCard key={s.id} sweet={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
