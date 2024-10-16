import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginForm } from './Auth';
import { MemoryRouter } from 'react-router-dom';

// Mock useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginForm Component', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );
  
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  

  it('submits the form with valid credentials', async () => {
    const credentials = { username: 'admin', password: 'password123' };
    mockLogin.mockResolvedValueOnce({}); // Mock successful login

    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: credentials.username },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: credentials.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(credentials);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('displays error message for invalid credentials', async () => {
    const credentials = { username: 'admin', password: 'wrongpassword' };
    const error = new Error('Unauthorized');
    mockLogin.mockRejectedValueOnce(error);

    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: credentials.username },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: credentials.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(credentials);
      expect(screen.getByText(/invalid username and\/or password/i)).toBeInTheDocument();
    });
  });

  it('displays a generic error message for other errors', async () => {
    const credentials = { username: 'admin', password: 'password123' };
    const error = new Error('Network Error');
    mockLogin.mockRejectedValueOnce(error);

    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: credentials.username },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: credentials.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(credentials);
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('can dismiss the error alert', async () => {
    const credentials = { username: 'admin', password: 'wrongpassword' };
    const error = new Error('Unauthorized');
    mockLogin.mockRejectedValueOnce(error);

    render(
      <MemoryRouter>
        <LoginForm login={mockLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: credentials.username },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: credentials.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid username and\/or password/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(screen.queryByText(/invalid username and\/or password/i)).not.toBeInTheDocument();
    });
  });
});
