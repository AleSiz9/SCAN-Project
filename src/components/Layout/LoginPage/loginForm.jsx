import { useState } from "react";
import { useAuth } from "../../../authService/authService";
import Button from "../../UI/button";
import styles from "./login.module.css"


const LoginForm = () => {

  const { login, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.login, formData.password);
  };

  const handleChange = (e) => {
    if (!e.target) return;
    const { name, value } = e.target
    if (error) clearError();
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const isFormValid = (formData?.login || '').length > 0 && (formData?.password || '').length > 0;

  return (
    <form action="" onSubmit={handleSubmit} className={styles.form__login}>
      <p className={styles.login}>
        <label className={styles.login__title} htmlFor="login">
          Логин или номер телефона:
        </label>
        <input
          id="login"
          aria-label="Логин или номер телефона"
          name="login"
          type="text"
          value={formData.login}
          onChange={handleChange}
          required
          className={styles.login__input}
        />
      </p>
      <p className={styles.password}>
        <label className={styles.password__title} htmlFor="password">
          Пароль:
        </label>
        <input
          id="password"
          aria-label="Пароль"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={styles.password__input}
        />
        {error && (
          <span role="alert"
            aria-live="assertive"
            className="error-message">{error}</span>
        )}
      </p>
      <Button type="submit" variant="primary" disabled={!isFormValid || loading}>
        Войти
      </Button>
    </form>
  )
}

export default LoginForm