import React, { useState } from 'react';
import axios from 'axios';
import '../application/application.css'
import { useNavigate } from "react-router-dom";


const Application = ({ loginUser }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    state: "",
    city: "",
    college: "",
    branch: ""
  });

  // const [alertMessage, setAlertMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }


  const Apply = () => {
    const { name, email, number, age, state, city, college, branch } = user;
    if (name && email && number && age && state && city && college && branch) {
      axios.post("http://localhost:9002/application", user)
        .then((response) => {
          const res = response.data;
          if (res.success) {
            // localStorage.setItem("isLoggedIn", true);
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // setAlertMessage("Invalid input");
    }
  };



  return (
    <form className='application'>
      <h1>Application form</h1>
      <input type="text" name="name" placeholder="Your Name" value={user.name} onChange={handleChange} required></input>
      {loginUser && loginUser.email && 
      // <h5>{loginUser.email}</h5>
      <input type="email" name='email' value={user.email} placeholder="Your email" onChange={handleChange} required/>
      }
      {/* <input type="text" name="email" placeholder="Your Email" required></input> */}
      <div className="number">
        <input type="number" name="number" placeholder="Your mobile number" value={user.number} onChange={handleChange} required></input>
        <input type="date" name="age" placeholder="Your mobile number" value={user.age} onChange={handleChange} required></input>
      </div>
      <div className="place">
        <input type="text" name='state' placeholder='State' value={user.state} onChange={handleChange} required />
        <input type="text" name='city' placeholder='City' value={user.city} onChange={handleChange} required />
      </div>
      <input type="text" name="college" placeholder="Your College" value={user.college} onChange={handleChange} required></input>
      <input type="text" name="branch" placeholder="Your Branch" value={user.branch} onChange={handleChange} required></input>
      <input type="reset" className="button" />
      {/* <input type="submit" className="button" onClick={Apply}/> */}
      <div className="button" onClick={Apply} >submit</div>
    </form>
  )
}

export default Application
