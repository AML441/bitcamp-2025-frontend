"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function LoginPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className={styles.body}>
            <div className={styles.pdf}>
                <h1> PDF HERE</h1>

            </div>

            <div className={styles.info}>
                <div className={styles.searchDef}>
                    <div className={styles.defTitle}>
                        <h1>Definitions</h1>
                    </div>
                    <div className={styles.search}>
                            <div className={styles.searchBar}>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.searchBar}
                                placeholder="Type to search..."
                            />
                            </div>
                            <button className={styles.searchButton}>
                                Search
                            </button>
                        </div>
                        <div className={styles.definitions}>
                            <p>definitions go here.</p>
                        </div>
                </div>
                <div className={styles.summary}>
                <h1>Summary</h1>
                    <p className={styles.summaryBox}>
                        WHATEVER THE API PUTS GOES HERE
                    </p>
                </div>

            </div>
        </div>

    );
  }