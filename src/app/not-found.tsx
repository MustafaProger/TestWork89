import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.nf}>
      <div className="container">
        <div className={styles["nf__wrap"]}>
          <div className={styles["nf__badge"]}>404</div>

          <h1 className={styles["nf__title"]}>Page not found</h1>
          <p className={styles["nf__text"]}>
            It looks like this page does not exist yet. We are already working on it —
            <strong> coming soon!</strong>
          </p>
          <div className={styles["nf__actions"]}>
            <Link href="/" className={styles["nf__btn-primary"]}>
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
