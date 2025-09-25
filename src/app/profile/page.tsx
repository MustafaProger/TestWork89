"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Profile.module.scss";
import { useAuthStore } from "@/store/auth.store";
import useAuthReady from "@/hooks/useAuthReady";

export default function ProfilePage() {
  const router = useRouter();

  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const { isHydrated, isAuthed } = useAuthReady();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthed) router.replace("/login");
  }, [isHydrated, status, router]);

  if (!user) return null;

  if (!isHydrated) return null;
  if (!isAuthed) return null;

  const avatar = user.image || "/globe.svg";

  return (
    <main className={styles.profile}>
      <div className={styles["profile__container"]}>
        <section className={styles["profile__card"]}>
          <div className={styles["profile__avatar"]}>
            <Image
              src={avatar}
              alt={`${user.firstName} ${user.lastName}`}
              width={120}
              height={120}
              sizes="120px"
            />
          </div>

          <h1 className={styles["profile__title"]}>
            {user.firstName} {user.lastName}
          </h1>

          <ul className={styles["profile__list"]}>
            <li className={styles["profile__item"]}>
              <span className={styles["profile__label"]}>Username:</span> {user.username}
            </li>
            <li className={styles["profile__item"]}>
              <span className={styles["profile__label"]}>Email:</span> {user.email}
            </li>
            <li className={styles["profile__item"]}>
              <span className={styles["profile__label"]}>Gender:</span> {user.gender}
            </li>
          </ul>

          <div className={styles["profile__actions"]}>
            <button
              className={`${styles["btn"]} ${styles["btn--danger"]}`}
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              aria-label="Logout"
            >
              Logout
            </button>

            <button className={styles["btn"]} onClick={() => router.push("/")} aria-label="Go home">
              Home
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
