'use client';
import React, { useState } from 'react';
import styles from '../app/page.module.css';
import Cookies from 'js-cookie';
//comment here
interface UploadModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  refreshContracts: () => void;
}

export default function UploadModal({ showModal, setShowModal, refreshContracts }: UploadModalProps) {
  const [contractName, setContractName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    setShowModal(false);
    setContractName('');
    setFile(null);
    setError('');
  };

  const handleUpload = async () => {
    if (!file || !contractName.trim()) {
        setError('Must submit contract name and .pdf file');
        return;
      } else {
        setError('');
      }


    const token = Cookies.get('token');
    if (!token) {
     setError('You must be logged in to upload');
        return;
      } else {
        setError('');
      }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("contractName", contractName.trim());

    try {
      setUploading(true);
      const res = await fetch("https://backend-service-qb1k.onrender.com/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Upload successful!");
        setShowModal(false);
        setContractName('');
        setFile(null);
        refreshContracts();
      } else {
        console.error("Upload failed:", result);
        alert("Failed to upload: " + result.error);
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Unexpected error during upload");
    } finally {
      setUploading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={handleClose}>❌</button>
        <h2 className={styles.modalTitle}>Upload PDF</h2>

        <input
          className={styles.inputField}
          type="text"
          placeholder="Contract Name"
          value={contractName}
          onChange={(e) => setContractName(e.target.value)}
        />

        <input
          className={styles.inputField}
          type="file"
          accept=".pdf"
          border-radius="15px"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button className={styles.submitButton} onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}