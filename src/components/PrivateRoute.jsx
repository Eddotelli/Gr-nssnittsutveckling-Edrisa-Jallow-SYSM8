// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return null; // eller en loader om du föredrar det

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
