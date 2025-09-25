"use client";

import { Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const setUserName = useAuthStore((s) => s.setUserName);
  const setPassword = useAuthStore((s) => s.setPassword);

  const login = useAuthStore((s) => s.login);
  const status = useAuthStore((s) => s.status);
  const error = useAuthStore((s) => s.error);

  const [showPassword, setShowPassword] = useState(false);

  const isLoading = status === "loading";
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await login();
    return res;
  }

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status, error]);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__field}>
        <input
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          type="text"
          placeholder="username"
          aria-label="Username"
          className={styles.form__input}
          disabled={isLoading}
          style={{ opacity: `${isLoading ? 0.5 : 1}` }}
        />
      </div>

      <div className={styles.form__field}>
        <div className={styles["form__password-wrapper"]}>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            aria-label="Password"
            className={styles.form__input}
            disabled={isLoading}
            style={{ opacity: `${isLoading ? 0.5 : 1}` }}
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
            className={styles.form__eye}
            disabled={isLoading}
            style={{ opacity: `${isLoading ? 0.5 : 1}` }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {error && <p className={styles.form__error}>{error}</p>}

      <button
        type="submit"
        className={styles.form__btn}
        disabled={isLoading}
        style={{ opacity: `${isLoading ? 0.5 : 1}` }}
      >
        {isLoading ? "Logging..." : "Login"}
      </button>
    </form>
  );
}
