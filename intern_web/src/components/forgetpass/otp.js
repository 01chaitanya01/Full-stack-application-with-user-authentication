import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import './forgetpass.css'

const Otp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = e => {
    setOtp(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    showLoader();
    axios
      .post("http://localhost:9002/update-password", { otp: otp, password:password })
      .then((response) => {
        const res = response.data;
        if (res.success) {
          setAlertMessage(res.message);
          showAlert();
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          setAlertMessage(res.message);
          showAlert();
          stopLoader();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const showAlert = () => {
    var alertElement = document.getElementById('alert');
    if (alertElement.classList.contains('visible')) {
      return;
    }
    alertElement.classList.add('visible');
    setTimeout(function () {
      alertElement.classList.remove('visible');
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
    <div className='forgetpass'>
      <h1>Change Password</h1>
      <input type="number" name='otp' value={otp} placeholder='Enter OTP' onChange={handleChange} />
      <input type="password" name='password' value={password} placeholder='Enter new password' onChange={handleChangePassword} />
      <div className='button' onClick={handleSubmit}>Submit</div>
      <div id="alert" className="alert">{alertMessage}</div>
      <div className="loader" id='loader'><img src={require("../images/loader.gif")} alt="" /></div>
    </div>
  );
};

export default Otp;
