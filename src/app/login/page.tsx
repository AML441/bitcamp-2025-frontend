'use client';
import Image from "next/image";
import styles from './page.module.css';
import bitcampLogo from '../../imgs/bitcamp2025logo.png';
import { useState } from 'react';

function LoginPage() { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles.body}>
            <div className={styles.titleWrapper}>
            <Image
                src={bitcampLogo}
                alt="logo"
                width={170}
                height={150}
                className={styles.logo}
            />
           <div className={styles.loginTitle}>
                <h1>
                    Sign In
                </h1>
            </div>
        </div>
            <div className={styles.username}>
                <h3 className={styles.fieldTitle}>Username: </h3>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
                placeholder="Enter username..."
            />
            </div>

            <div className={styles.password}>
                <h3 className={styles.fieldTitle}>Password: </h3>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    placeholder="Enter password..."
                />
            </div>

            <button className={styles.submitButton}>
                Submit
            </button>
        </div>

    );
};

export default LoginPage;