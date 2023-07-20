import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });
  };

  const login = () => {
    showLoader();
    axios
      .post("http://localhost:9002/login", user)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setLoginUser(res.user);
          localStorage.setItem("isLoggedIn", true);
          showLoader();
          setAlertMessage(res.message);
          showAlert();
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setAlertMessage(res.message);
          showAlert();
          stopLoader();
        }
      })
      .catch((error) => {
        stopLoader();
        console.error(error);
      });
  };

  const showAlert = () => {
    var alertElement = document.getElementById('alert');
    if (alertElement?.classList.contains('visible')) {
      return;
    }
    alertElement?.classList.add('visible');
    setTimeout(function () {
      alertElement?.classList.remove('visible');
    }, 1000);
  };

  const showLoader = () =>{
    let loaderElement = document.getElementById('loader');
    loaderElement?.classList.add('viewloader');
  }

  const stopLoader = () =>{
    let loaderElement = document.getElementById('loader');
    if(loaderElement?.classList.contains('viewloader')){
      loaderElement.classList.remove('viewloader');
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="email" name='email' value={user.email} placeholder='Enter Email' onChange={handleChange} />
      <input type="password" name='password' value={user.password} placeholder='Enter password' onChange={handleChange} />
      <div className='button' onClick={login} >Login</div>
      <div>or</div>
      <div className='button' onClick={() => navigate("/register")}>Register</div>
      <div id="alert" className="alert">{alertMessage}</div>
      <div className="otp" onClick={() => navigate("/mail")}>Forget Password</div>
      <div className="loader" id='loader'><img src={require("../images/loader.gif")} alt="" /></div>
    </div>
  );
};

export default Login;


