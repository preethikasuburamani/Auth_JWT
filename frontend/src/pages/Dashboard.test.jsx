import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from './Dashboard';

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock('../auth/AuthProvider', () => ({ useAuth: () => ({ user: { name: 'Ada Lovelace', email: 'ada@example.com', realm_access: { roles: ['USER'] } }, keycloak: { logout: vi.fn() } }) }));
vi.mock('../services/api', () => ({ apiFetch }));

describe('Dashboard API states', () => {
  beforeEach(() => { apiFetch.mockReset(); });
  it('shows a loading state while the protected request is pending', () => {
    apiFetch.mockReturnValue(new Promise(() => {}));
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Call protected API' }));
    expect(screen.getByRole('button', { name: 'Calling API…' })).toBeDisabled();
  });
  it('shows an error when the protected request fails', async () => {
    apiFetch.mockRejectedValue(new Error('You do not have permission to do that.'));
    render(<MemoryRouter><Dashboard /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Call protected API' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('You do not have permission');
  });
});
