// LoginForm.tsx
"use client";

import { Eye, EyeOff } from "lucide-react";
import styles from "./Login.module.scss";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { loginRequest } from "@/services/auth";

export default function LoginForm() {
  const username = useAuthStore((s) => s.username);
  const password = useAuthStore((s) => s.password);
  const setUserName = useAuthStore((s) => s.setUserName);
  const setPassword = useAuthStore((s) => s.setPassword);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (username.trim().length < 3 || password.trim().length < 3) {
      setError("Минимум 3 символа в каждом поле");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const res = await loginRequest({ username, password });
      alert(`Привет, ${res.firstName} ${res.lastName}`);
      console.log(res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      const msg = e.response.data.message ?? e.message ?? "Ошибка авторизации";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

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
