// Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import styles from "./Navbar.module.css";
import "../../styles/theme.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", target: "hero" },
    { name: "Services", target: "services" },
    { name: "Gallery", target: "gallery" },
    { name: "Contact", target: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderNavItem = (item) => {
    if (location.pathname === "/") {
      return (
        <ScrollLink
          key={item.target}
          to={item.target}
          smooth={true}
          offset={-70}
          duration={500}
          spy={true}
          activeClass={styles.active}
          className={styles.navLink}
          onClick={() => closeMenu()}
        >
          {item.name}
        </ScrollLink>
      );
    } else {
      return (
        <RouterLink
          key={item.target}
          to="/"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setTimeout(() => {
              scroller.scrollTo(item.target, {
                smooth: true,
                duration: 500,
                offset: -70,
              });
            }, 100);
            closeMenu();
          }}
        >
          {item.name}
        </RouterLink>
      );
    }
  };

  const renderBookNow = () => {
    if (location.pathname === "/") {
      return (
        <ScrollLink
          to="contact"
          smooth={true}
          offset={-70}
          duration={500}
          spy={true}
          activeClass={styles.active}
          className={styles.ctaButton}
          onClick={() => closeMenu()}
        >
          Book Now
        </ScrollLink>
      );
    } else {
      return (
        <RouterLink
          to="/"
          className={styles.ctaButton}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setTimeout(() => {
              scroller.scrollTo("contact", {
                smooth: true,
                duration: 500,
                offset: -70,
              });
            }, 100);
            closeMenu();
          }}
        >
          Book Now
        </RouterLink>
      );
    }
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <RouterLink
          to="/"
          className={styles.logo}
          onClick={(e) => {
            // If already on home page, scroll to top
            if (location.pathname === "/") {
              e.preventDefault();
              scroller.scrollTo("hero", {
                smooth: true,
                duration: 500,
                offset: 0,
              });
            }
          }}
        >
          <span className={styles.logoPrimary}>Elegance</span>
          <span className={styles.logoSecondary}>Events</span>
        </RouterLink>
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburger}></span>
        </button>
        <div
          className={`${styles.navWrapper} ${isMenuOpen ? styles.active : ""}`}
        >
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.target}>{renderNavItem(item)}</li>
            ))}
          </ul>
          {renderBookNow()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
