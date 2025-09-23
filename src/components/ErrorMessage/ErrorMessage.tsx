import { AlertCircle } from "lucide-react";
import styles from "./ErrorMessage.module.scss";

const ErrorMessage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <AlertCircle className={styles.icon} />
        <h2 className={styles.title}>Error</h2>
        <p className={styles.text}>Something went wrong</p>
      </div>
    </div>
  );
};

export default ErrorMessage;