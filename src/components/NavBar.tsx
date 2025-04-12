'use client';

import Link from 'next/link';
import styles from '../components/NavBar.module.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, refreshAuth } = useAuth();

  const handleLogout = () => {
    Cookies.remove('token');
    refreshAuth();
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navLink}>
        FinePrintasaurus
      </Link>

      {isLoggedIn ? (
        <button onClick={handleLogout} className={styles.navLink}>
          Logout
        </button>
      ) : (
        <Link href="/login" className={styles.navLink}>
          Sign In
        </Link>
      )}
    </nav>
  );
};

export default Navbar;