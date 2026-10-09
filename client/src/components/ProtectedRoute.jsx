import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "@/context/AdminContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AdminContext);

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}