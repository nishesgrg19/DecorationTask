import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import styles from './LightBox.module.css';

const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className={styles.lightboxOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.lightboxContent}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={process.env.PUBLIC_URL + image.src} 
              alt={image.alt} 
              className={styles.lightboxImage}
            />
            <button 
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close lightbox"
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;