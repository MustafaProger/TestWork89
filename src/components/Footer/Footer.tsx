import Link from "next/link";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__links}>
        <li className={styles.footer__logo}>
          <Link href="/">AbeloHost Shop</Link>
        </li>
        <li>
          <Link href="/about" className={styles.footer__link}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contacts" className={styles.footer__link}>
            Contacts
          </Link>
        </li>
        <li>
          <Link href="/privacy" className={styles.footer__link}>
            Privacy Policy
          </Link>
        </li>
        <li className={styles.footer__copy}>© {new Date().getFullYear()} MyShop</li>
      </ul>
    </footer>
  );
}
