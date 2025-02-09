import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { scroller } from 'react-scroll';
import styles from './OfferPopup.module.css';

const OfferPopup = ({ onClose }) => {
  const handleBookNow = () => {
    onClose();
    scroller.scrollTo('contact', {
      smooth: true,
      duration: 800,
      offset: -70 // Adjust this value if you have a fixed header
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.offerOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.offerPopup}
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <button onClick={onClose} className={styles.closeButton}>
            <FaTimes />
          </button>
          <div className={styles.offerContent}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/logo.jpeg`} 
              alt="Special Offer"
              className={styles.offerImage}
            />
            <h2>Welcome to Elegance Events!</h2>
            <p>First Event Discount Up to <strong>15% OFF</strong> on your first event with us.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.offerCta}
              onClick={handleBookNow}
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OfferPopup;