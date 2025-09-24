"use client";

import { Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";

export default function LoginForm() {
  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const setUserName = useAuthStore((s) => s.setUserName);
  const setPassword = useAuthStore((s) => s.setPassword);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <form className={styles.form}>
      <div className={styles.form__field}>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.form__input}
          type="text"
          placeholder="username"
          aria-label="Username"
        />
      </div>

      <div className={styles.form__field}>
        <div className={styles["form__password-wrapper"]}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.form__input}
            type={showPassword ? "text" : "password"}
            placeholder="password"
            aria-label="Password"
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            className={styles.form__eye}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button type="submit" className={styles.form__btn}>
        Login
      </button>
    </form>
  );
}
