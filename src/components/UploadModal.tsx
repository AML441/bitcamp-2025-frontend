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

  const handleUpload = async () => {
    if (!file || !contractName.trim()) {
      alert("Please provide a contract name and file.");
      return;
    }

    const token = Cookies.get('token');
    if (!token) {
      alert("You must be logged in to upload.");
      return;
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
        <button className={styles.closeButton} onClick={() => setShowModal(false)}>❌</button>
        <h2 className={styles.modalButton}>Upload</h2>

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
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button className={styles.submitButton} onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}