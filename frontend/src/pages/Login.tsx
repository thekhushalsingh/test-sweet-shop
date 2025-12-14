import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));

      login(token, payload.role);

      // 🔁 Role based redirect
      payload.role === "ADMIN"
        ? navigate("/admin")
        : navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* LEFT BRAND SECTION */}
        <div className="login-left">
          <h1>🍬 Sweet Shop</h1>
          <p>
            Login to explore delicious sweets, manage your cart,
            and enjoy a delightful shopping experience.
          </p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="login-right">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Please login to your account</p>

          {error && <div className="error-box">{error}</div>}

          <input
            type="email"
            placeholder="📧 Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={submit} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="register-link">
            Don’t have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
