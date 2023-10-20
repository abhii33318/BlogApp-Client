import React from 'react';
import Navbar from '../../Header';
import AboutVideo from '../../../assets/AboutVBG.mp4';
import './About.css';

function About() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-video">
          <video autoPlay loop muted className="video">
            <source src={AboutVideo} type="video/mp4" /> {/* Update the source with your video file */}
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="about-content">
          <h1>About Us</h1>
          <p>
          Blogs are a type of regularly updated websites that provide insight into a certain topic. The word blog is a combined version of the words “web” and “log.” At their inception, blogs were simply an online diary where people could keep a log about their daily lives on the web. They have since morphed into an essential forum for individuals and businesses alike to share information and updates. In fact, many people even make money blogging as professional full-time bloggers. 
          As the publishing world has evolved, and more of it has moved online, blogs have come to occupy a central position in this digital content world. Blogs are a source of knowledge, opinion and concrete advice. While not yet posed to replace journalism as an art form, people increasingly look to trusted blogs to find answers to their questions, or to learn how to do something. 
        Blogs are always evolving both in terms of how they're created and what they are used for. They can be a vehicle for creativity and for marketing. They're also increasingly created and read on mobile apps, as mobile blogging also comes into its own. 


          </p>
          {/* Add more content here */}
        </div>
      </div>
    </div>
  );
}

export default About;
