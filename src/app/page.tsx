import Image from "next/image";
import styles from "./page.module.css";
import UserTable from "../components/UserTable";




export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>
            Welcome, NAME
          </h1>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.uploadButton}>
            <h1>UPLOAD HERE!</h1>
          </button>
        </div>
        <div className={styles.table}>
          <UserTable />
        </div>
      </div>
      
    </div>
  );
}
