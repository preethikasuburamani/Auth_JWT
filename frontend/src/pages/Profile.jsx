import { useAuth } from '../auth/AuthProvider';

export default function Profile() {
  const { user } = useAuth();
  const details = [['Full name', user?.name], ['Username', user?.preferred_username], ['Email', user?.email], ['Email verified', user?.email_verified ? 'Yes' : 'Not verified'], ['Subject ID', user?.sub]];
  return <main className="page-wrap narrow"><div className="eyebrow">ACCOUNT</div><h1>Your profile</h1><p className="muted">Profile information comes from your Keycloak identity token.</p><section className="panel profile-list">{details.map(([label, value]) => <div className="profile-row" key={label}><span>{label}</span><strong>{value || 'Not provided'}</strong></div>)}</section></main>;
}
