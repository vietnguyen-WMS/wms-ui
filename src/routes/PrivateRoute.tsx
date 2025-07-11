import type { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/stores';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
