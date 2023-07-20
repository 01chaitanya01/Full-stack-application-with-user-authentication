import React from 'react';
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const menuDrop = () => {
    let menudrop = document.getElementById("navContainer").classList.toggle("dropmenu");
    if (!menudrop) {
      document.getElementById("crossbtn").style.opacity = ("0")
      document.getElementById("menubtn").style.opacity = ("1")
    } else {
      document.getElementById("menubtn").style.opacity = ("0")
      document.getElementById("crossbtn").style.opacity = ("1")
    }
  }



  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  const handleLogout = () => {
    setLoginUser({});
    localStorage.removeItem('isLoggedIn');
  };

  // Check if the user is authenticated
  const isLoggedIn = !!localStorage.getItem('isLoggedIn');


  return (
    <div className="header">
      <div className='nav-bar'>
        <div className="logo">
          <Link to='/'><img src={require("../images/logo.png")} alt="" className='logoimage'/></Link>
          <Link to='/'><h1>StreamLine</h1></Link>
        </div>
        <div className="menu-bar">
          <img src={require("../images/menu.png")} className='menubtn' id='menubtn' alt="" onClick={menuDrop} />
          <img src={require("../images/cross.png")} className='crossbtn' id='crossbtn' alt="" />
        </div>
        <div className="nav-container" id='navContainer'>
          <Link to="/" className='nav-links'>Home</Link>
          <Link to="/services" className='nav-links'>Services</Link>
          <Link to="/" className='nav-links'>About</Link>
          <Link to="/" className='nav-links'>Dashboard</Link>
          {isLoggedIn && (
            <div className="dropdown">
              {/* <button onClick={myFunction} className="dropbtn">Dropdown</button> */}
              <img src={require('../images/setting.png')} alt="" onClick={myFunction} className="dropbtn" />
              <div id="myDropdown" className="dropdown-content">
                <div className='drop-links'>Profile</div>
                <div className='drop-links' onClick={handleLogout}>Logout</div>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <button className='loginbtn' onClick={() => navigate("/login")}>Login</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

