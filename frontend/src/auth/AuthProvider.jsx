import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import keycloak from './keycloak';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    let alive = true;
    keycloak.init({ onLoad: 'check-sso', pkceMethod: 'S256', checkLoginIframe: false })
      .then(() => { if (alive) setReady(true); })
      .catch((error) => { console.error('Keycloak initialization failed', error); if (alive) setReady(true); });
    keycloak.onAuthSuccess = () => setRevision((n) => n + 1);
    keycloak.onAuthLogout = () => setRevision((n) => n + 1);
    keycloak.onAuthRefreshSuccess = () => setRevision((n) => n + 1);
    return () => { alive = false; };
  }, []);
  const value = useMemo(() => ({ ready, authenticated: Boolean(keycloak.authenticated), keycloak, user: keycloak.tokenParsed || null }), [ready, revision]);
  if (!ready) return <div className="boot-screen" role="status">Connecting securely…</div>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
