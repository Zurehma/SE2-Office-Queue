import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './Navbar.jsx';

describe('NavigationBar', () => {
  const mockLogout = jest.fn();

  const renderNavigationBar = (loggedIn = false, pathname = '/', user = { name: 'John Doe' }) => {
    window.history.pushState({}, 'Test Page', pathname);
    return render(
      <Router>
        <NavigationBar loggedIn={loggedIn} handleLogout={mockLogout} user={user} />
      </Router>
    );
  };

  test('renders the brand name', () => {
    renderNavigationBar();
    expect(screen.getByText(/office management/i)).toBeInTheDocument();
  });

  test('shows welcome message and user name when logged in', () => {
    renderNavigationBar(true);
    expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
  });

  test('does not show welcome message when not logged in', () => {
    renderNavigationBar(false);
    expect(screen.queryByText(/welcome, john doe/i)).not.toBeInTheDocument();
  });

  test('shows Home and Login buttons when not logged in', () => {
    renderNavigationBar(false, '/some-path');
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('does not show Home button if already on the Home page', () => {
    renderNavigationBar(false, '/');
    expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
  });

  test('shows Logout button when logged in', () => {
    renderNavigationBar(true);
    fireEvent.click(screen.getByRole('button', { name: '' })); // Clicking on the dropdown
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('calls handleLogout when Logout is clicked', () => {
    renderNavigationBar(true);
    fireEvent.click(screen.getByRole('button', { name: '' })); // Open the dropdown
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });

  test('navigates to home when home dropdown item is clicked', () => {
    const navigateMock = jest.fn();
    renderNavigationBar(true, '/profile');
    fireEvent.click(screen.getByRole('button', { name: '' })); // Open dropdown
    fireEvent.click(screen.getByText(/home/i));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
