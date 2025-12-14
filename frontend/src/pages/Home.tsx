import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

export default function Home() {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/sweets/public")
      .then(res => setSweets(res.data.slice(0, 8)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-content">
          <h1>Welcome to Sweet Shop</h1>
          <p>Discover delicious sweets made with love.</p>

          <div className="hero-cta">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
        <div className="hero-visual">🍭 🍫 🍪 🍩</div>
      </section>

      {/* SWEETS */}
      <section className="home-showcase">
        <h2>Popular Sweets 🍭</h2>

        {loading && <p style={{ textAlign: "center" }}>Loading sweets...</p>}
        {!loading && sweets.length === 0 && (
          <p style={{ textAlign: "center" }}>No sweets available 🍬</p>
        )}

        <div className="grid">
          {sweets.map(s => (
            <div className="card home-card" key={s.id}>
              <h3>
                {categoryIcons[s.category] || categoryIcons.Default} {s.name}
              </h3>
              <span className="badge">{s.category}</span>
              <p>{s.description}</p>
              <p><strong>₹{s.price}</strong></p>
              <button disabled>Login to Purchase 🔐</button>
            </div>
          ))}
        </div>
         <div className="view-more">
          <Link to="/login">View All Sweets →</Link>
        </div>
      </section>

       {/* CTA FOOTER */}
      <section className="home-cta">
        <h2>✨ Ready to explore sweetness?</h2>
        <p>Create your account and start shopping today.</p>
        <br></br><br></br>
        <Link to="/register" className="btn-primary">
          Get Started 🚀
        </Link>
      </section>
    

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © 2025 Sweet Shop. All rights reserved.
        </p>
        <p>
          Developed by <strong>Khushal Singh</strong> 
        </p>
      </footer>
    </div>
  );
}
