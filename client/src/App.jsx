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
import ManagerHalf from './components/ManagerHalf';
import NotFound from './components/NotFound';


function App() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
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
          <Route path="/customer-service" element={<CustomerHalf errror = {error} setError={setError}/>}/>
          <Route path="/manager" element={<ManagerHalf errror = {error} setError={setError}/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Container>
    
    </div>
  );
}

export default App;