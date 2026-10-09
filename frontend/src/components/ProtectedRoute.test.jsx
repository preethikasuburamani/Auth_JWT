import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProtectedRoute from './ProtectedRoute';

const login = vi.fn();
let authenticated = false;
vi.mock('../auth/AuthProvider', () => ({ useAuth: () => ({ authenticated, keycloak: { login } }) }));

describe('ProtectedRoute', () => {
  beforeEach(() => { authenticated = false; login.mockReset(); });
  function renderRoute() {
    return render(<MemoryRouter initialEntries={['/dashboard']}><Routes><Route element={<ProtectedRoute />}><Route path="/dashboard" element={<p>Protected dashboard</p>} /></Route></Routes></MemoryRouter>);
  }
  it('redirects anonymous visitors to Keycloak and does not render protected content', async () => {
    renderRoute();
    expect(screen.queryByText('Protected dashboard')).not.toBeInTheDocument();
    await waitFor(() => expect(login).toHaveBeenCalled());
  });
  it('renders protected content for authenticated visitors', () => {
    authenticated = true;
    renderRoute();
    expect(screen.getByText('Protected dashboard')).toBeInTheDocument();
  });
});
