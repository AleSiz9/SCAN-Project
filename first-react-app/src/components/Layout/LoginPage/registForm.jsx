import Button from "../../UI/button";
import styles from "./login.module.css"


const RegistrationForm = () => {

  return (
    <form id="registration-form" action="" className={styles.form__login}>
      <p className={styles.login}>
        <label className={styles.login__title} htmlFor="login">Логин или номер телефона:</label>
        <input
          id="login"
          name="login"
          type="text"
          required
          className={styles.login__input}
        />
      </p>
      <p className={styles.password}>
        <label className={styles.password__title} htmlFor="password">Пароль:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={styles.password__input}
        />
      </p>
      <p className={styles.password}>
        <label className={styles.password__title} htmlFor="confirmPassword">Повторите пароль</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className={styles.password__input}
        />
      </p>
      <Button type="submit" variant="primary" disabled>
        Зарегистрироваться
      </Button>
    </form>
  )
}

export default RegistrationForm