import React from 'react';
import '../Styles/about.css';

const About = () => {
  return (
    <div className="about-container">
      <h2 className="about-title">About Natthu Furniture</h2>
      <p className="about-intro">
        At Natthu Furniture, we blend traditional craftsmanship with modern design to create elegant, durable wooden furniture for homes and offices. Our commitment to quality and customer satisfaction has made us a trusted name since 1980.
      </p>

      <div className="about-section">
        <h3>🎯 Our Mission</h3>
        <p>
          To deliver timeless and high-quality furniture that brings comfort, style, and value to every living and working space.
        </p>
      </div>

      <div className="about-section">
        <h3>🌟 Our Vision</h3>
        <p>
          To be a globally recognized leader in custom wooden furniture by embracing innovation, sustainability, and exceptional service.
        </p>
      </div>

      <div className="about-section">
        <h3>🏡 Our History</h3>
        <p>
          Since 1990, Natthu Furniture has evolved from a small local workshop into a nationwide brand. With over four decades of experience, we continue to uphold the values of quality, integrity, and creativity.
        </p>
      </div>

      <div className="team-section">
        <h3>👥 Meet Our Team</h3>
        <div className="team-grid">
          <div className="team-card">
            <img src="/images/team1.jpg" alt="John Doe" />
            <h4>Chhotu Chandaniya</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <img src="/images/team2.jpg" alt="Jane Smith" />
            <h4>Jethu Chandaniya</h4>
            <p>Head of Design</p>
          </div>
          <div className="team-card">
            <img src="/images/team3.jpg" alt="Mark Johnson" />
            <h4>Yogesh Chandaniya</h4>
            <p>Production Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
