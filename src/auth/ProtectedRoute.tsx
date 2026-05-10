import { Navigate, useLocation } from 'react-router-dom';
import { type ReactNode } from 'react';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loggedIn } = useAuth();
  const loc = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }
  return <>{children}</>;
}
