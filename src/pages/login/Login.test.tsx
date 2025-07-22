import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Đặt mockNavigate ở ngoài để dùng cho mọi test
const mockNavigate = vi.fn();

// Mock react-router-dom trước khi import Login
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

const renderLogin = () => {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
};

describe('Login', () => {
  it('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText('User name')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('invalidates empty some or all fields', async () => {
    renderLogin();
    const user = userEvent.setup();
    const userNameInput = screen.getByLabelText('User name');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    // Check that the error message is shown when all fields are empty
    await user.clear(userNameInput);
    await user.clear(passwordInput);
    await user.click(loginButton);

    expect(
      await screen.findByText('Username and password are required.')
    ).toBeInTheDocument();

    // Check that the error message is cleared when a field is filled
    await user.type(userNameInput, 'account1');

    expect(
      screen.queryByText('Username and password are required.')
    ).not.toBeInTheDocument();

    // Check that the error message is shown when only password is empty
    await user.clear(passwordInput);
    await user.click(loginButton);

    expect(
      await screen.findByText('Username and password are required.')
    ).toBeInTheDocument();
  });

  it('login successfully with valid credentials', async () => {
    let resolveFetch: any;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = () =>
        resolve({
          ok: true,
          json: () => Promise.resolve({ username: 'viet' }),
        });
    });

    const mockFetch = vi
      .spyOn(global, 'fetch')
      .mockImplementation((url, options) => {
        if (
          typeof url === 'string' &&
          url.endsWith('/login') &&
          options?.method === 'POST'
        ) {
          return fetchPromise as any;
        }

        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve({}),
        } as Response);
      });

    renderLogin();
    const user = userEvent.setup();
    const userNameInput = screen.getByLabelText('User name');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    await user.type(userNameInput, 'viet');
    await user.type(passwordInput, '1');
    await user.click(loginButton);
    await waitFor(() => expect(loginButton).toBeDisabled());
    resolveFetch();
    await waitFor(() => expect(loginButton).not.toBeDisabled());

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    mockFetch.mockRestore();
  });
});
