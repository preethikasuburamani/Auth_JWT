import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const { keycloak, authenticated } = useAuth();
  async function openPasswordHelp(event) {
    event.preventDefault();
    try { window.location.assign(await keycloak.createLoginUrl()); }
    catch { window.location.assign((import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8080') + '/realms/' + (import.meta.env.VITE_KEYCLOAK_REALM || 'fullstack-realm') + '/account'); }
  }
  return <main className="auth-card"><div className="eyebrow">WELCOME BACK</div><h1>Sign in to your account</h1><p className="muted">Your secure sign-in is handled by Keycloak.</p>
    {authenticated ? <Link className="button primary full" to="/dashboard">Continue to dashboard</Link> : <button className="button primary full" onClick={() => keycloak.login()}>Continue to secure sign in</button>}
    {!authenticated && <p className="forgot-link"><a href="#password-help" onClick={openPasswordHelp}>Forgot your password?</a> <span>Choose “Forgot password?” on the Keycloak sign-in page.</span></p>}
    <p className="hosted-note">Keycloak will ask for your username or email and password on its secure sign-in page. Use “Forgot password?” there if you need to reset your password.</p>
    <div className="auth-switch">New here? <Link to="/register">Create an account</Link></div>
  </main>;
}
