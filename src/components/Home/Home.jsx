import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPhone,
  FaArrowUp,
} from "react-icons/fa";
import { Element as ScrollElement } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";
import Lightbox from "../LightBox/LightBox";
import emailjs from "@emailjs/browser";
import styles from "./Home.module.css";
import MessageModal from "../MessageModal/MessageModal";
import OfferPopup from "../OfferPopup/OfferPopup";
import "../../styles/theme.css";

const services = [
  {
    title: "Birthday Decorations",
    img: "/assets/birthday.png",
    path: "/services/birthdays",
  },
  {
    title: "Baby & Bridal Showers",
    img: "/assets/babyshower.png",
    path: "/services/showers",
  },
  {
    title: "Surprise Proposals",
    img: "/assets/surprise-proposal.jpg",
    path: "/services/proposals",
  },
  {
    title: "Mehendi & Haldi Ceremonies",
    img: "/assets/mehendi.jpg",
    path: "/services/mehendi",
  },
  {
    title: "Corporate Events",
    img: "/assets/school-events.jpg",
    path: "/services/school",
  },
];

const galleryImages = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/assets/gallery-${i + 1}.jpg`,
  alt: `Event decoration ${i + 1}`,
}));

const Home = () => {
  const [statusModal, setStatusModal] = useState({
    show: false,
    type: "", // 'success' or 'error'
    message: "",
  });

  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email) => {
    // Basic email format validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) return false;

    // Allowed email providers
    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
    ];

    // Extract domain part
    const domain = email.split("@")[1].toLowerCase();

    // Check if domain is in allowed list or a custom domain (you can modify this logic)
    return (
      allowedDomains.includes(domain) ||
      domain.endsWith(".edu") || // Example: Allow educational institutions
      domain.endsWith(".gov")
    ); // Example: Allow government domains
  };

  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return re.test(phone);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSending) return;

    if (!validateEmail(formData.email)) {
      setStatusModal({
        show: true,
        type: "error",
        message:
          "Please use a valid email from supported providers (Gmail, Yahoo, Outlook, etc.)",
      });
      return;
    }

    if (!validatePhone(formData.phone)) {
      setStatusModal({
        show: true,
        type: "error",
        message: "Please enter a valid phone number",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          user_name: formData.name,
          user_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatusModal({
          show: true,
          type: "success",
          message:
            "Message received successfully. Thank you for contacting Elegance Events.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      setStatusModal({
        show: true,
        type: "error",
        message:
          error.text || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Framer Motion variants for animations
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const hasSeenOffer = sessionStorage.getItem("hasSeenOfferSession");
    const timer = setTimeout(() => {
      if (!hasSeenOffer) {
        setShowOffer(true);
        sessionStorage.setItem("hasSeenOfferSession", "true");
      }
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Lightbox for gallery images */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </AnimatePresence>

      {/* Offer Popup */}
      <AnimatePresence>
        {showOffer && <OfferPopup onClose={() => setShowOffer(false)} />}
      </AnimatePresence>

      {/* Add Message Modal Here */}
      <AnimatePresence>
        {statusModal.show && (
          <MessageModal
            type={statusModal.type}
            message={statusModal.message}
            onClose={() => setStatusModal({ ...statusModal, show: false })}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <ScrollElement name="hero">
        <motion.section
          className={styles.heroSection}
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <Typewriter
                words={["Creating Moments of Elegance"]}
                typeSpeed={80}
                deleteSpeed={0}
                cursor={false}
              />
            </h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              Premium event design and decoration services for life's most
              precious moments
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              <ScrollLink to="contact" smooth={true} className={styles.heroCta}>
                Start Planning Your Event →
              </ScrollLink>
            </motion.div>
          </div>
        </motion.section>
      </ScrollElement>

      {/* Services Section */}
      <ScrollElement name="services">
        <motion.section
          className={styles.servicesSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Our Signature Services</h2>
            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  className={styles.serviceCard}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index}
                >
                  <div className={styles.cardImage}>
                    <img
                      src={process.env.PUBLIC_URL + service.img}
                      alt={service.title}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{service.title}</h3>
                    <Link to={service.path} className={styles.cardCta}>
                      Explore Service
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>
      </ScrollElement>

      {/* Gallery Section */}
      <ScrollElement name="gallery">
        <motion.section
          className={styles.gallerySection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Our Recent Work</h2>
            <div className={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className={styles.galleryItem}
                  onClick={() => setSelectedImage(image)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {
                      opacity: 0,
                      scale: 0.8,
                      rotate: -5,
                    },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: index * 0.1,
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: Math.random() * 4 - 2,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={process.env.PUBLIC_URL + image.src}
                      alt={image.alt}
                      loading="lazy"
                    />
                    <motion.div
                      className={styles.imageOverlay}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.span initial={{ y: 20 }} whileHover={{ y: 0 }}>
                        View Full Size
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </ScrollElement>

      {/* Contact Section */}
      <ScrollElement name="contact">
        <motion.section
          className={styles.contactSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Get In Touch</h2>
            <div className={styles.contactContent}>
              <motion.form
                className={styles.contactForm}
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.formGroup}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <FaPhone
                    className={`${styles.inputIcon} ${styles.flipIcon}`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
                <div className={styles.messageGroup}>
                  <FaCommentDots className={styles.messageIcon} />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSending}
                  className={styles.submitButton}
                >
                  {isSending ? (
                    <div className={styles.spinner}></div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </motion.form>

              <motion.div
                className={styles.contactInfo}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>Contact Information</h3>
                <p>
                  We'd love to hear from you! Whether you have a question about
                  our services, pricing, or anything else, our team is ready to
                  answer all your questions.
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:contact@eleganceevents.com">
                    contact@eleganceevents.com
                  </a>
                </p>
                <p>
                  Phone: <a href="tel:+977-9849064803">+977-9849064803</a> /{" "}
                  <a href="tel:+977-9803415465">+977-9803415465</a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </ScrollElement>

      {/* Back To Top Link */}
      <motion.div
        className={styles.backToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: isScrolled ? 1 : 0,
          y: isScrolled ? 0 : 20,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <ScrollLink
          to="hero"
          smooth={true}
          duration={800}
          className={styles.backToTopButton}
          aria-label="Back to top"
        >
          <FaArrowUp className={styles.arrowIcon} />
        </ScrollLink>
      </motion.div>
    </div>
  );
};

export default Home;
