import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';


import { HomeButton, LoginButton } from './Auth';


export function NavigationBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = props.handleLogout;

  return (
    <Navbar variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">
      <i className="bi bi-envelope ms-2 me-2 text-white"></i>Office Management
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {props.loggedIn ? (
            <div className="d-flex align-items-center">
              <i className="bi bi-person-circle text-white me-2 my-icons"></i>
              <h5 className="text-white mt-1">Welcome, {props.user.name}</h5>
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-custom-navbar"
                  className="my-arrow-dropdown"
                >
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end me-2">
                  {location.pathname !== '/' && <Dropdown.Item onClick={() => navigate('/')}><i className="bi bi-house-door"></i> Home</Dropdown.Item>}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-danger"><i className="bi bi-box-arrow-right"></i> Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
          <>
            <>
              {location.pathname !== '/' && <HomeButton />}
              {location.pathname !== '/login' && <LoginButton />}
            </>
          </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


