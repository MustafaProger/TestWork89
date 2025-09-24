"use client";

import { Eye } from "lucide-react";
import styles from "./Login.module.scss";

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <div className={styles.form__field}>
        <input
          className={styles.form__input}
          type="text"
          placeholder="username"
          aria-label="Username"
        />
      </div>

      <div className={styles.form__field}>
        <div className={styles["form__password-wrapper"]}>
          <input
            className={styles.form__input}
            type="password"
            placeholder="password"
            aria-label="Password"
          />
          <button type="button" className={styles.form__eye} aria-label="Show password">
            <Eye size={18} />
          </button>
        </div>
      </div>

      <button type="submit" className={styles.form__btn}>
        Login
      </button>
    </form>
  );
}
