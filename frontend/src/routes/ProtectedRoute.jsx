import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { usuario, token } = useAuth();

  if (!token || !usuario) return <Navigate to="/login" replace />;

  if (role && usuario.rol !== role) {
    return <Navigate to={`/${usuario.rol}`} replace />;
  }

  return children;
}
