import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          {/* Replace text with image */}
          <img 
            src={`${process.env.PUBLIC_URL}/assets/logo.jpeg`} 
            alt="Elegance Events Logo"
            className={styles.logo}
          />
           <p>Creating unforgettable experiences since 2023</p>
        </div>
        
        {/* Rest of the footer remains the same */}
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <ScrollLink to="services" smooth={true} duration={800} offset={-70}>
                Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="gallery" smooth={true} duration={800} offset={-70}>
                Gallery
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contact" smooth={true} duration={800} offset={-70}>
                Contact
              </ScrollLink>
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h4>Contact</h4>
          <p>Email: contact@eleganceevents.com</p>
          <p>Phone: +977-9849064803/ +977-9803415465</p>
        </div>

        <div className={styles.section}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/share/1GYjgvckJ6/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com/elegance.events_/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        © 2023 Elegance Events. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;