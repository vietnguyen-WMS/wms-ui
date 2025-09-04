import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/stores';
import { GlobalLoading } from '@/components/ui';

const RedirectIfAuthenticated = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthLoading && user) {
      navigate('/', { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  if (isAuthLoading) return <GlobalLoading />;

  return !user ? children : null;
};

export default RedirectIfAuthenticated;
