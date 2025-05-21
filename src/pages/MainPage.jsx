import React, { useEffect } from 'react';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Order from './Order';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import '../Styles/MainPage.css';

const MainPage = ({ scrollTo }) => {
  useEffect(() => {
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [scrollTo]);

  return (
    <div>
      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="order"><Order /></section>
      <section id="contact"><Contact /></section>

      <section id="footer" className="footer">
        <p>© 2025 Natthu Furniture Mart. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          <a href="https://wa.me/7020108186" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
        </div>
        <p>Connect with us for exclusive offers, design inspiration, and personalized support.</p>
      </section>
    </div>
  );
};

export default MainPage;
