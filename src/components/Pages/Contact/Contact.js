import React from 'react';
import Navbar from '../../Header';
import AboutVideo from '../../../assets/AboutVBG.mp4';
import './Contact.css';

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
            <li>
              <strong>Email:</strong> <a href="mailto:contact@example.com">contact@example.com</a>
            </li>
            <li>
              <strong>Phone:</strong> +1 (123) 456-7890
            </li>
            <li>
              <strong>Address:</strong> 1234 Main Street, City, Country
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
