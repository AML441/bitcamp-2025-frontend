'use client';
import React, { useState } from 'react';
import styles from '../app/page.module.css';

interface UploadModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  refreshContracts: () => void; // 👈 added prop
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

    const formData = new FormData();
    formData.append("file", file);
    formData.append("contractName", contractName.trim());

    try {
      setUploading(true);
      const res = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Upload successful!");
        setShowModal(false);
        setContractName('');
        setFile(null);
        refreshContracts(); // 👈 trigger refresh!
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