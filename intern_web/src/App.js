import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Homepage from './components/homepage/homepage';
import Login from './components/login/login';
import Register from './components/register/register';
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer';
import Training from './components/homepage/training';
import Services from './components/services/services';
import Application from './components/application/application'
import Mail from './components/forgetpass/mail';
import Otp from './components/forgetpass/otp';

const App = () => {
  const [loginUser, setLoginUser] = useState(
    // Load user data from local storage on initial render
    JSON.parse(localStorage.getItem('loggedInUser')) || {}
  );

  // Update local storage whenever loginUser state changes
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loginUser));
  }, [loginUser]);

  const PrivateRoute = ({ path, element }) => {
    if (localStorage.getItem("isLoggedIn")) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/application" element={<Application loginUser={loginUser} />} />
        <Route path="/mail" element={<Mail />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/" element={
          <>
            <Navbar setLoginUser={setLoginUser} />
            <Homepage loginUser={loginUser} />
            <Training/>
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Navbar setLoginUser={setLoginUser} />
            <Services />
            <Training/>
            <Footer/>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;
