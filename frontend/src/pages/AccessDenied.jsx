import { Link } from 'react-router-dom';
export default function AccessDenied() { return <main className="empty-state"><div className="empty-code">403</div><h1>Access denied</h1><p className="muted">Your account does not have permission to view this page.</p><Link className="button primary" to="/dashboard">Back to dashboard</Link></main>; }
