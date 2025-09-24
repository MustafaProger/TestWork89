import styles from "./Login.module.scss";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <section className={styles.login}>
      <div className={styles.login__card}>
        <h1 className={styles.login__title}>Login</h1>
        <LoginForm />
      </div>
    </section>
  );
}