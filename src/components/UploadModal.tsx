'use client';
import styles from '../app/page.module.css';

interface UploadModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export default function UploadModal({ showModal, setShowModal }: UploadModalProps) {
  if (!showModal) return null;
  return (
    
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setShowModal(false)}>❌</button>
        <h2 className={styles.modalButton}>Upload </h2>
        <input className={styles.inputField} type="text" placeholder="Contract Name" />
        <input className={styles.inputField} type="file" />
        <button className={styles.submitButton}>Submit</button>
      </div>
    </div>
  );
}