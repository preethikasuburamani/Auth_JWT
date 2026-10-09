import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
  const { authenticated, keycloak } = useAuth();
  const navigate = useNavigate();
  return <header className="topbar"><Link className="brand" to="/"> <span className="brand-mark">A</span> Auth<span className="brand-light">space</span></Link>
    <nav aria-label="Main navigation"><Link to="/dashboard">Dashboard</Link>{authenticated && <Link to="/profile">Profile</Link>}
      {authenticated ? <button className="nav-action" onClick={() => keycloak.logout({ redirectUri: window.location.origin })}>Log out</button> : <button className="nav-action" onClick={() => { navigate('/login'); }}>Sign in</button>}</nav>
  </header>;
}
