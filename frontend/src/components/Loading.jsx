export default function Loading({ children = 'Loading…' }) { return <div className="loading" role="status"><span className="spinner" aria-hidden="true" />{children}</div>; }
