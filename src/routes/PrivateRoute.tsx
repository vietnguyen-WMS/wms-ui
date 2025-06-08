import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/stores";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isAuthChecked } = useAuth();
  const location = useLocation();

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="block">
          <button type="button" className="bg-indigo-500" disabled>
            <svg className="mr-3 size-5 animate-spin" viewBox="0 0 24 24"></svg>
            Processing…
          </button>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
