import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Register() {
  const { keycloak } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }); }
  function submit(event) {
    event.preventDefault(); setError('');
    if (!form.name.trim() || !form.email.trim() || !form.username.trim() || !form.password) return setError('Complete all fields to continue.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address.');
    if (form.password.length < 8) return setError('Use a password with at least 8 characters.');
    if (form.password !== form.confirm) return setError('The passwords do not match.');
    // Password input is only validated locally; account creation and password storage remain in Keycloak.
    setBusy(true); keycloak.register().catch(() => { setError('Could not open the secure registration page. Check that Keycloak is running.'); setBusy(false); });
  }
  return <main className="auth-card"><div className="eyebrow">GET STARTED</div><h1>Create your account</h1><p className="muted">Your account will be created securely by Keycloak.</p>
    <form onSubmit={submit} noValidate>
      <label>Full name<input name="name" value={form.name} onChange={update} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" /></label>
      <label>Username<input name="username" value={form.username} onChange={update} autoComplete="username" /></label>
      <label>Password<div className="password-field"><input name="password" type={show ? 'text' : 'password'} value={form.password} onChange={update} autoComplete="new-password"/><button type="button" className="show-password" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></div></label>
      <label>Confirm password<input name="confirm" type={show ? 'text' : 'password'} value={form.confirm} onChange={update} autoComplete="new-password" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button primary full" disabled={busy}>{busy ? 'Opening secure registration…' : 'Continue to registration'}</button>
    </form>
    <p className="hosted-note">Your details are entered again on Keycloak's hosted registration page. This form sends no registration data to the Java API and does not persist passwords.</p>
    <div className="auth-switch">Already registered? <Link to="/login">Sign in</Link></div>
  </main>;
}
