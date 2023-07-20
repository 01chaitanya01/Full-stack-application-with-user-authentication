import React from 'react';
import "../footer/footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-content">
                <h4>StreamLine</h4>
                <div className="footer-links">
                    <a href="#"><FontAwesomeIcon icon={faLinkedin} className='social-icons'/></a>
                    <a href="#"><FontAwesomeIcon icon={faGithub} className='social-icons' /></a>
                    <a href="#"><FontAwesomeIcon icon={faInstagram} className='social-icons' /></a>
                    <a href="#"><FontAwesomeIcon icon={faTwitter} className='social-icons' /></a>
                </div>
                <div className="footer-copyright">
                    <p>copyright &copy;2023 StreamLine IT services and Tranining.</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
