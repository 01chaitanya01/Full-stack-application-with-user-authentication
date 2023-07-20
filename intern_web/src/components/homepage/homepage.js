import React from 'react';
import "./homepage.css";

const Homepage = ({ loginUser }) => {

  return (
    <div className="homepage">

      <div className="home-header"></div>
      <div className="header-content">

        <h1 className='headline'>Unlocking Potential, Empowering Success: Streamline IT Solutions and Training</h1>
        {/* <p className='slogan'>Seamless Solutions for IT, Web, and Training</p> */}
        {loginUser && loginUser.name && <h5><span className='first-word'>Welcome</span>, {loginUser.name}</h5>}
        <div className="header-btn">
          <a href="#itservices"><button>Join Internship</button></a>
        </div>
      </div>

      <section className="service-sec">
        <h2>SERVICES</h2>
        <div className="services-images">
          <div className="itservices">
            <div className="card">
              <img src={require("../images/webdesign.png")} alt="Avatar" />
              <div className="container">
                <h5>Web Designing</h5>
                <button>Know more</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/nft.png")} alt="Avatar" />
              <div className="container">
                <h5>NFT's</h5>
                <button>Know more</button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* <section className='clients'>
        <h2>Some of our clients</h2>
        <div className="clients-container">
          <div className="clients-content">
            <img src={require("../images/cpp.png")} alt="" />
            <div className="client-heading">
              <h3>EarthVerse</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id ducimus sed quo, odio asperiores repellat quae exercitationem minus error possimus.</p>
              <div className="footer-links">
                <a href="#"><FontAwesomeIcon icon={faLinkedin} className='social-icons' /></a>
                <a href="#"><FontAwesomeIcon icon={faGithub} className='social-icons' /></a>
                <a href="#"><FontAwesomeIcon icon={faInstagram} className='social-icons' /></a>
                <a href="#"><FontAwesomeIcon icon={faTwitter} className='social-icons' /></a>
              </div>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default Homepage;