import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function AuthRequired({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
