import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  role?: "ADMIN" | "USER";
}

export default function ProtectedRoute({ children, role }: Props) {
  const { token, role: userRole } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
