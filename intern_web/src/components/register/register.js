import React, { useState } from 'react';
import axios from 'axios';
import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const showAlert = () => {
        var alertElement = document.getElementById('alert');
        if (alertElement.classList.contains('visible')) {
            return;
        }
        alertElement.classList.add('visible');
        setTimeout(function () {
            alertElement.classList.remove('visible');
        }, 1000);
    }

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    });

    const [alertMessage, setAlertMessage] = useState("");

    const handleChange = e => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }


    const register = () => {
        showLoader();
        const { name, email, password, reEnterPassword } = user;
        if (name && email && password && (password === reEnterPassword)) {
            axios.post("http://localhost:9002/register", user)
                .then(res => {
                    showAlert();
                    setAlertMessage(res.data.message);
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            showAlert();
            setAlertMessage("Invalid input");
            stopLoader();
        }
    };

    const showLoader = () => {
        let loaderElement = document.getElementById('loader');
        loaderElement?.classList.add('viewloader');
    }

    const stopLoader = () => {
        let loaderElement = document.getElementById('loader');
        if (loaderElement?.classList.contains('viewloader')) {
            loaderElement.classList.remove('viewloader');
        }
    }


    return (
        <div className='register'>
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>
            <div id='alert' className="alert">{alertMessage}</div>
            <div className="loader" id='loader'><img src={require("../images/loader.gif")} alt="" /></div>
        </div>
    );
};

export default Register;


