import Link from 'next/link';
import styles from '../components/NavBar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <Link href="/" className={styles.navLink}>
            FinePrintasaurus
        </Link>
        <Link href="/login" className={styles.navLink}>
            Sign In
        </Link>
    </nav>
  );
};

export default Navbar;