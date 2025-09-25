"use client";

import useAuthReady from "@/hooks/useAuthReady";
import styles from "./Login.module.scss";
import LoginForm from "./LoginForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const { isHydrated, isAuthed } = useAuthReady();

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthed) router.replace("/");
  }, [isHydrated, isAuthed, router]);

  return (
    <section className={styles.login}>
      <div className={styles.login__card}>
        <h1 className={styles.login__title}>Login</h1>
        <LoginForm />
      </div>
    </section>
  );
}
