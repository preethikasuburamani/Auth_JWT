import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Register from './Register';

const register = vi.fn();
vi.mock('../auth/AuthProvider', () => ({ useAuth: () => ({ keycloak: { register } }) }));

describe('Register', () => {
  beforeEach(() => register.mockReset());
  it('shows a validation message when passwords do not match', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'ada' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'different123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continue to registration' }));
    expect(screen.getByRole('alert')).toHaveTextContent('The passwords do not match.');
    expect(register).not.toHaveBeenCalled();
  });
  it('toggles password visibility', () => {
    render(<MemoryRouter><Register /></MemoryRouter>);
    const password = document.querySelector('input[name="password"]');
    expect(password).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getAllByRole('button', { name: 'Show' })[0]);
    expect(password).toHaveAttribute('type', 'text');
  });
});
