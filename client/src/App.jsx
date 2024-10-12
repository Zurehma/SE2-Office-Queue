import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

/**
 * React imports
 */
import React from 'react';
import { useState } from 'react'
import { Container, Alert } from 'react-bootstrap';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

/**
 * Component imports
 */
import API from '../Api';
import {Home} from './components/Home';
import { NavigationBar } from './components/Navbar';
import {LoginForm} from './components/Auth';


function App() {
  /**
   * the user state is set to null if nobody logged in, otherwise it contains user info
   */
  const [user, setUser] = useState(null);
  /**
   * The error state can be passed to other components, by setting it with the setError callback you areable
   * to make the Alert display which kind of error was generated 
   */
  const [error, setError] = useState(null);
  /**
   * loggedIn state is set to True in case the user logged in (maybe useless?-> you could check if user is null)
   */
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
 
  /**
   * This function handles the login process.
   */
  const handleLogin = async (credentials) => {
    await API.logIn(credentials);
    API.getUserInfo().then((user) => {
      setUser(user);
      setLoggedIn(true);
    }).catch((err) => setError(err));
  };

  /**
  * This function handles the logout process.
  */ 
  const handleLogout = async () => {
      await API.logOut();
      // clean up everything
      setLoggedIn(false); setUser(null);
      navigate('/');
  };


  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar loggedIn={loggedIn} user={user} handleLogout={handleLogout} />
      <Container fluid className="flex-grow-1 d-flex flex-column">
        {error && (
        <Alert variant="danger" className="fixed-bottom mt-3" dismissible onClose={() => setError(null)}>
          <p>{error.message}</p>
        </Alert>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={ 
              loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin}/>}/>
          
        </Routes>
      </Container>
    </div>
  );
}

export default App;