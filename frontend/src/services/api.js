import keycloak from '../auth/keycloak';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081';

export async function apiFetch(path) {
  if (!keycloak.authenticated) throw new Error('Please sign in to continue.');
  try {
    await keycloak.updateToken(30);
  } catch {
    await keycloak.login();
    throw new Error('Your session expired. Please sign in again.');
  }
  const response = await fetch(`${API_BASE}${path}`, { headers: { Authorization: `Bearer ${keycloak.token}`, Accept: 'application/json' } });
  if (response.status === 401) { await keycloak.login(); throw new Error('Your session expired. Please sign in again.'); }
  if (response.status === 403) throw new Error('You do not have permission to do that.');
  if (!response.ok) throw new Error(`The server returned ${response.status}. Please try again.`);
  return response.json();
}
