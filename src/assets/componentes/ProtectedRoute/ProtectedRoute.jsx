import React from "react";
import { useAuth } from "../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  const esAdmin = user?.rol === "admin" || user?.email?.toLowerCase() === "admin@gmail.com";
  const tienePermiso = !rolesPermitidos?.length || rolesPermitidos.includes(user?.rol) || (rolesPermitidos.includes("admin") && esAdmin);

  if (!user || !tienePermiso) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
