'use client';

import Image from "next/image";
import bitcampLogo from '../imgs/Dino2wBackground-removebg-preview.png';
import styles from "./page.module.css";
import { useEffect, useState } from 'react';
import UploadModal from '../components/UploadModal';
import UserTable from "../components/UserTable";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [contracts, setContracts] = useState([]);

  // 🔐 Redirect to login if no token
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchContracts(token);
    }
  }, [router]);

  // 🔄 Fetch contracts with token
  const fetchContracts = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/contracts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setContracts(data);
    } catch (err) {
      console.error("Failed to fetch contracts:", err);
    }
  };

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
          <h1 className={styles.titleText}>Welcome!</h1>
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
        refreshContracts={() => {
          const token = Cookies.get('token');
          if (token) fetchContracts(token);
        }}
      />
    </div>
  );
}
