'use client';
import Image from "next/image";
import bitcampLogo from '../imgs/bitcamp2025logo.png';
import styles from "./page.module.css";
import UserTable from "../components/UserTable";
import { useState } from 'react'; 
import UploadModal from '../components/UploadModal';




export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div>
        <div className={styles.titleWrapper}>
          <Image
            src={bitcampLogo}
            alt="logo"
            width={200}
            height={200}
            className={styles.logo}
          />
          <h1 className={styles.titleText}>Welcome, NAME</h1>
        </div>
        </div>
        <div className={styles.buttonContainer}>
        <button className={styles.uploadButton} onClick={() => setShowModal(!showModal)}>
            <h1>UPLOAD HERE!</h1>
          </button>
        </div>
        <div className={styles.table}>
          <UserTable />
        </div>
      </div>
      <UploadModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
