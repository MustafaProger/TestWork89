"use client";

import Link from "next/link";
import styles from "./Footer.module.scss";
import { useAuthStore } from "@/store/auth.store";

export function Footer() {
  const user = useAuthStore((s) => s.user);

  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__links}>
        <li className={styles.footer__logo}>
          <Link href="/">AbeloHost Shop</Link>
        </li>
        {user?.email ? (
          <Link href="/profile" className={styles.footer__link}>{`Logged as ${user.email}`}</Link>
        ) : (
          <>
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
          </>
        )}

        <li className={styles.footer__copy}>© {new Date().getFullYear()} AbeloHost Shop</li>
      </ul>
    </footer>
  );
}
