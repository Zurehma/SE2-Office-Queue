import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'

import React from 'react';
import { useState,useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import API from '../Api';
import {Home} from './components/Home';
import { NavigationBar } from './components/Navbar';
import {LoginForm} from './components/Auth';
import CustomerHalf from './components/CustomerHalf';

function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
 
  /**
   * This function handles the login process.
   */
  const handleLogin = async (credentials) => {
    const user = await API.logIn(credentials);
    setUser(user); setLoggedIn(true);
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
      
      {/*<img src={backgroundImage} alt="Background Image" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        zIndex: -1
      }} />
      <CustomerHalf />*/}
    </div>
  );
}

export default App;