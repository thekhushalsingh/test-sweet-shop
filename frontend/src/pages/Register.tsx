import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
        role
      });

      setSuccess("Account created successfully 🎉");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setError("User already exists or invalid data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* LEFT INFO */}
        <div className="register-left">
          <h1>🍭 Join Sweet Shop</h1>
          <p>
            Create your account and enjoy a delightful shopping experience.
            Choose your role and get started instantly.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="register-right">
          <h2>Create Account ✨</h2>
          <p className="subtitle">Sign up in seconds</p>

          {error && <div className="error-box">{error}</div>}
          {success && <div className="success-box">{success}</div>}

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

          <input
            type="password"
            placeholder="🔒 Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* ROLE SELECTION */}
          <div className="role-select">
            <label>
              <input
                type="radio"
                value="USER"
                checked={role === "USER"}
                onChange={() => setRole("USER")}
              />
              👤 User
            </label>

            <label>
              <input
                type="radio"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={() => setRole("ADMIN")}
              />
              🛠 Admin
            </label>
          </div>

          <button onClick={submit} disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
