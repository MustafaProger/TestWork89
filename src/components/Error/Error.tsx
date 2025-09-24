import { AlertCircle } from "lucide-react";
import styles from "./Error.module.scss";

export default function Error() {
  return (
    <div className={styles.error__wrapper}>
      <div className={styles.error__box}>
        <AlertCircle className={styles.error__icon} />
        <h2 className={styles.error__title}>Error</h2>
        <p className={styles.error__text}>Something went wrong</p>
      </div>
    </div>
  );
}
