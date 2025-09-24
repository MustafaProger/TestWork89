import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading__wrapper}>
      <div className={styles.loading__spinner}></div>
    </div>
  );
}
