'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import styles from './page.module.css';
import bitcampLogo from '../../imgs/bitcamp2025logo.png';
import { useAuth } from '@/components/AuthContext'; // ✅ Step 1
//comment here
export default function AuthPage() {
  const router = useRouter();
  const { refreshAuth  } = useAuth(); // ✅ Step 2

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    if (!username || !password) {
      alert('Please fill in both fields');
      return;
    } 

    setLoading(true);
    try {
      const endpoint = isLogin ? 'login' : 'register';
      const res = await fetch(`https://backend-service-qb1k.onrender.com/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          Cookies.set('token', data.token, { expires: 1 });
          refreshAuth();
          router.push('/');
        } else {
          alert('Registered! You can now log in.');
          setIsLogin(true);
        }
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error(`${isLogin ? 'Login' : 'Register'} error:`, err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
    <div className={styles.body}>
      <div className={styles.titleWrapper}>
        <Image src={bitcampLogo} alt="logo" width={170} height={150} className={styles.logo} />
        <div className={styles.loginTitle}>
          <h1>{isLogin ? 'Sign In' : 'Register'}</h1>
        </div>
      </div>

      <div className={styles.username}>
        <h3 className={styles.fieldTitle}>Username:</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="Enter username..."
        />
      </div>

      <div className={styles.password}>
        <h3 className={styles.fieldTitle}>Password:</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="Enter password..."
        />
      </div>

      <button className={styles.submitButton} onClick={handleAuth} disabled={loading}>
        {loading ? (isLogin ? 'Logging in...' : 'Registering...') : 'Submit'}
      </button>

      <p className={styles.toggleText}>
        {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
        <button className={styles.toggleButton} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
    </div>
  );
}