import React from 'react';
import Navbar from '../../Header';
import AboutVideo from '../../../assets/AboutVBG.mp4';
import './Contact.css';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';

function Contact() {
  return (
    <div>
      <Navbar />
      <div className="Contact-container">
        <div className="Contact-video">
          <video autoPlay loop muted className="video">
            <source src={AboutVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="Contact-content">
          <h2>Our Contact Information</h2>
          <ul>
            <li className="contact-item">
              <FaEnvelope className="icon" /> <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
            <li className="contact-item">
              <FaPhone className="icon" /> +1 (123) 456-7890
            </li>
            <li className="contact-item">
              <FaMapMarker className="icon" /> 1234 Main Street, City, Country
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
