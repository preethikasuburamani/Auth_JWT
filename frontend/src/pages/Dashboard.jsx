import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { apiFetch } from '../services/api';

export default function Dashboard() {
  const { user, keycloak } = useAuth();
  const [result, setResult] = useState(null); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const roles = user?.realm_access?.roles?.filter((role) => ['USER', 'ADMIN'].includes(role)) || [];
  async function callApi() { setLoading(true); setError(''); setResult(null); try { setResult(await apiFetch('/api/user/dashboard')); } catch (err) { setError(err.message); } finally { setLoading(false); } }
  return <main className="page-wrap"><section className="welcome-panel"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>Welcome, {user?.given_name || user?.name || user?.preferred_username || 'there'} <span aria-hidden="true">✦</span></h1><p className="muted">You’re signed in. Your protected workspace is ready.</p></div><div className="avatar">{(user?.name || user?.preferred_username || 'U').slice(0, 1).toUpperCase()}</div></section>
    <section className="dashboard-grid"><article className="panel"><div className="panel-icon">◉</div><h2>Your account</h2><p><span className="field-name">Name</span>{user?.name || user?.preferred_username || 'Not provided'}</p><p><span className="field-name">Email</span>{user?.email || 'Not provided'}</p><p><span className="field-name">Roles</span>{roles.length ? roles.join(', ') : 'No application roles'}</p><Link className="text-link" to="/profile">View profile details →</Link></article>
      <article className="panel"><div className="panel-icon violet">⌘</div><h2>Protected Java API</h2><p className="muted">Send your Keycloak access token to the Spring Boot API.</p><button className="button primary" onClick={callApi} disabled={loading}>{loading ? 'Calling API…' : 'Call protected API'}</button>{error && <p className="form-error" role="alert">{error}</p>}{result && <pre className="api-result">{JSON.stringify(result, null, 2)}</pre>}</article></section>
    <div className="session-bar"><span><span className="status-dot"/>Signed in with Keycloak</span><button className="text-button" onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>Sign out of your account</button></div>
  </main>;
}
