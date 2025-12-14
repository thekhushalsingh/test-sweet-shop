import { useEffect, useState } from "react";
import api from "../services/api";
import { categoryIcons } from "../utils/categoryIcons";

type Purchase = {
  id: string;
  quantity: number;
  total: number;
  createdAt: string;
  sweet: {
    name: string;
    category: string;
  };
};

export default function PurchaseHistory() {
  const [history, setHistory] = useState<Purchase[]>([]);

  useEffect(() => {
    api.get("/purchases").then(res => setHistory(res.data));
  }, []);

  return (
    <div className="history">
      <h2>📜 Purchase History</h2>

      {history.length === 0 && (
        <p className="empty-text">No purchases yet 🍭</p>
      )}

      {history.map(p => {
        const icon =
          categoryIcons[p.sweet.category] || categoryIcons.Default;

        return (
          <div className="history-card" key={p.id}>
            <div>
              <h4>
                {icon} {p.sweet.name}
              </h4>
              <p>Quantity: {p.quantity}</p>
            </div>

            <div className="history-meta">
              <p><strong>₹{p.total}</strong></p>
              <span>
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
