import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
