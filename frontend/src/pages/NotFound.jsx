import { Link } from 'react-router-dom';
export default function NotFound() { return <main className="empty-state"><div className="empty-code">404</div><h1>Page not found</h1><p className="muted">We could not find that page.</p><Link className="button primary" to="/">Go home</Link></main>; }
