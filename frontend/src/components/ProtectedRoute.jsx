import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';

export default function ProtectedRoute() {
  const { authenticated, keycloak } = useAuth();
  const location = useLocation();
  useEffect(() => { if (!authenticated) keycloak.login({ redirectUri: window.location.origin + location.pathname }); }, [authenticated, keycloak, location.pathname]);
  if (!authenticated) return <div className="boot-screen">Taking you to secure sign in…</div>;
  return <Outlet />;
}
