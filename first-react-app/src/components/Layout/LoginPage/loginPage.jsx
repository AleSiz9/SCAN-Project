import { useRef, useState } from "react";
import RegistrationForm from "./registForm";
import styles from "./login.module.css"
import LoginForm from "./loginForm";

const RegistrationPage = () => {
  const registFormRef = useRef(null);
  const [isActive, setIsActive] = useState("enter");
  const scrollRegist = () => {
    setIsActive("register");
    registFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: "start"
    })
  }

  return (
    <main className={styles.loginPage}>
      <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
      <div className={styles.loginPage__containerForm}>
        <div className={styles.containerForm__img}>
          <img src="/images/imgForm/castle.svg" alt="Илюстрация замка" />
        </div>
        <div className={styles.containerForm__nav}>
          <div className={styles.nav__buttonEnter}>
            <button
              type="button"
              aria-label="Войти"
              id="end"
              className={`${styles.button} 
              ${isActive === "enter" ? styles.end__action : ""}`}
              onClick={() => setIsActive("enter")}>
              Войти
            </button>
          </div>
          <div className={styles.nav__buttonRegister}>
            <button
              type="button"
              aria-label="Зарегистрироваться"
              id="register"
              className={`${styles.button} 
              ${isActive === "register" ? styles.register__action : ""}`}
              onClick={scrollRegist}>
              Зарегистрироваться
            </button>
          </div>
        </div>
        {isActive === "enter" ? (
          <LoginForm />
        ) : (
          <div ref={registFormRef}>
            <RegistrationForm />
          </div>)}
        <div className={styles.containerForm__recoverPassword}>
          <a aria-label="Восстановить пароль" href="##">
            Восстановить пароль
          </a>
        </div>
        <div className={styles.containerForm__icon}>
          <p className={styles.icon__title}>Войти через</p>
          <div className={styles.icon__list}>
            <a href="##" className="icon-google icon__border" >
              <img src="/images/imgForm/Google.svg"
                alt="Google"
                style={{ width: "59px", height: "19px" }} />
            </a>
            <a href="##" className="icon-facebook icon__border" >
              <img src="/images/imgForm/Facebook.svg"
                alt="Facebook"
                style={{ width: "59px", height: "12px" }} />
            </a>
            <a href="##" className="icon-yadex icon__border" >
              <img src="/images/imgForm/Yandex.svg"
                alt="Yadex"
                style={{ width: "56px", height: "16px" }} />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.loginPage__img}>
        <img src="/images/imgForm/Characters.svg"
          alt="Персонажи"
          style={{ maxWidth: "100%", }} />
      </div>
    </main>
  )
}

export default RegistrationPage