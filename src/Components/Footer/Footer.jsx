import React from "react";
import "./Footer.css";
import google from "../../assets/google.png";
import ios from "../../assets/ios.png";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>POPULAR LOCATIONS</h3>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>TRENDING LOCATIONS</h3>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            <li>About OLX Group</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>OLXPeople</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>OLX</h3>
          <ul>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy Information</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>FOLLOW US</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
            <i class="fa-brands fa-facebook" ></i>
            </a>
            <a href="#" className="social-icon">
            <i class="fa-brands fa-instagram" ></i>
            </a>
            <a href="#" className="social-icon">
            <i class="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
            <i class="fa-brands fa-youtube"></i>
            </a>
          </div>
          <div className="app-stores">
            <a href="#" className="app-store">
              <img src={ios} alt="Get it on App Store" />
            </a>
            <a href="#" className="app-store">
              <img src={google} alt="Get it on Google Play" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Other Countries: Pakistan - South Africa - Indonesia</p>
        <p>Free Classifieds in India. © 2006-2024 OLX</p>
      </div>
    </footer>
  );
}

export default Footer;
