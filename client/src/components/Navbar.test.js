import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { NavigationBar } from './Navbar.jsx'; 
import { MemoryRouter } from 'react-router-dom';

describe('NavigationBar', () => {
  const mockLogout = jest.fn();
  jest.mock('./Auth', () => ({
    LoginButton: () => <button>Mock Login</button>,
    HomeButton: () => <button>Mock Home</button>,
  }));

  const MockNavbar = (props) => {
    return <NavigationBar {...props} />;
  };

  it('renders the brand name', () => {
    render(
      <MemoryRouter>
        <MockNavbar loggedIn={true} handleLogout={mockLogout} user={{ name: 'John Doe' }} />
      </MemoryRouter>
    );
    expect(screen.getByText(/office management/i)).toBeInTheDocument();
  });

  it('shows welcome message and user name when logged in', () => {
    render(
      <MemoryRouter>
        <MockNavbar loggedIn={true} handleLogout={mockLogout} user={{ name: 'John Doe' }} />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome, john doe/i)).toBeInTheDocument();
  });
  
  it('Does not show the welcome message if not logged in', () => {
    render(
      <MemoryRouter>
        <MockNavbar loggedIn={false} handleLogout={mockLogout} user={{ name: 'John Doe' }} />
      </MemoryRouter>
    );
    expect(screen.queryByText(/welcome, john doe/i)).not.toBeInTheDocument();
  });
  
  
  it('dropdown shows correct items when user is logged in', () => {
    render(
      <MemoryRouter>
        <NavigationBar loggedIn={true} handleLogout={mockLogout} user={{ name: 'John Doe' }} />
      </MemoryRouter>
    );

    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: '' })); 
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('dropdown shows Home Button when user is logged in and not in the home', () => {
    render(
      <MemoryRouter initialEntries={['/some-other-path']}>
        <NavigationBar loggedIn={true} handleLogout={mockLogout} user={{ name: 'John Doe' }} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '' })); 

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
  
});
