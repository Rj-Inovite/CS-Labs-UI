import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <FaGraduationCap className="footer-logo-icon" />
            <div>
              <h3>CS Labs</h3>
              <p>Learn • Practice • Master</p>
            </div>
          </div>
          <p className="footer-desc">Your trusted platform for GATE CS preparation with expert mentorship and comprehensive study materials.</p>
          <div className="footer-social">
            <a href="#" className="social-icon"><FaFacebook /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
           
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/courses')}>Courses</li>
            <li onClick={() => navigate('/blog')}>Blog</li>
            <li onClick={() => navigate('/contact')}>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li onClick={() => navigate('/terms')}>Terms & Conditions</li>
            <li onClick={() => navigate('/privacy')}>Privacy Policy</li>
            <li onClick={() => navigate('/pricing')}>Pricing</li>
            <li onClick={() => navigate('/policy')}>Our Policy</li>
            <li onClick={() => navigate('/refund')}>Refund Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="footer-contact">
            {/* <p><FaEnvelope /> support@cslabs.com</p> */}
            <p><FaPhone /> +91 98765 43210</p>
            <p><FaMapMarkerAlt /> Bangalore, Karnataka, India</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 CS Labs. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
