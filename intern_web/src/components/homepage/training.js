import React from 'react'
import './homepage.css'

const training = () => {
  return (
    <div className='homepage'>
      <section className="tranining">
        <h3>Training With Certification</h3>
        <div className="service-content2">
          <div className="itservices" id='itservices'>
            <div className="card">
              <img src={require("../images/python.png")} alt="Avatar" />
              <div className="container">
                <h5>Python</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/cprogramming.png")} alt="Avatar" />
              <div className="container">
                <h5>C Programming</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/cpp.png")} alt="Avatar" />
              <div className="container">
                <h5>C++</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/java.png")} alt="Avatar" />
              <div className="container">
                <h5>Java</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/webdev.png")} alt="Avatar" />
              <div className="container">
                <h5>Web Development</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/blockchain.png")} alt="Avatar" />
              <div className="container">
                <h5>BlockChain</h5>
                <button>Apply</button>
              </div>
            </div>
            <div className="card">
              <img src={require("../images/ai.png")} alt="Avatar" />
              <div className="container">
                <h5>AI and Chatgpt</h5>
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default training
