import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();

  if (["/login", "/register"].includes(location.pathname)) return null;

  return (
    <nav className="nav">
      <h3>🍭 Sweet Shop Management System</h3>
      <div>
        <Link to="/">Home</Link>
        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <Link to="/history">Orders</Link>
          </>
        )}
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {token && <button className="nav-logout" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
}
