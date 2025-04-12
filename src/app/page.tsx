'use client';

import Image from "next/image";
import bitcampLogo from '../imgs/Dino2wBackground-removebg-preview.png';
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import UploadModal from '../components/UploadModal';
import UserTable from "../components/UserTable";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [contracts, setContracts] = useState([]);

  // Fetch contracts once on mount + for refresh
  const fetchContracts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/contracts");
      const data = await res.json();
      setContracts(data);
    } catch (err) {
      console.error("Failed to fetch contracts:", err);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <Image
            src={bitcampLogo}
            alt="logo"
            width={250}
            height={250}
            className={styles.logo}
          />
          <h1 className={styles.titleText}>Welcome, NAME</h1>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.uploadButton}
            onClick={() => setShowModal(!showModal)}
          >
            <h1>UPLOAD HERE!</h1>
          </button>
        </div>

        <div className={styles.table}>
          <UserTable contracts={contracts} />
        </div>
      </div>

      <UploadModal
        showModal={showModal}
        setShowModal={setShowModal}
        refreshContracts={fetchContracts} // 👈 refresh table after upload
      />
    </div>
  );
}