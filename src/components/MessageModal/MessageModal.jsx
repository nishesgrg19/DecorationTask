import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styles from "./MessageModal.module.css"; // If using separate CSS module
// OR use: import styles from "../../Home/Home.module.css"; 

const MessageModal = ({ type, message, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className={`${styles.modalIcon} ${type === "success" ? styles.success : styles.error}`}>
            {type === "success" ? (
              <FaCheckCircle size={48} />
            ) : (
              <FaTimesCircle size={48} />
            )}
          </div>
          <h3 className={styles.modalTitle}>
            {type === "success" ? "Success!" : "Error!"}
          </h3>
          <p className={styles.modalMessage}>{message}</p>
          <button
            onClick={onClose}
            className={`${styles.modalButton} ${
              type === "success" ? styles.successButton : styles.errorButton
            }`}
          >
            {type === "success" ? "OK" : "Try Again"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageModal;