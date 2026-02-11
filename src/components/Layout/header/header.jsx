import logo from "../../../logo.svg"
import { Link } from "react-router-dom"
import { InfoUserContent, LoginButton, ProfileventFiltersInfo } from "./headerAuthStatus"
import styles from "./header.module.css"
import BurgerMenu from "./burgerMenu"
import { useAuth } from "../../../authService/authService"



const Header = () => {
  const { isAuthenticated, user } = useAuth();

    const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <header className={styles.header}>
      <img
        className={styles.logo__img}
        alt="Логотип Скан"
        src={logo}
      />
      <nav className={styles.nav}>
        <Link to="/">Главная</Link>
        <a href="#tarif">Тарифы</a>
        <a href="##" onClick={handleClick}>FAQ</a>
      </nav>
      <div className={styles.authDesktop}>
        {isAuthenticated && user ? (
          <>
            <ProfileventFiltersInfo />
            <InfoUserContent />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
      <div className={styles.authMobile}>
        {isAuthenticated && user && <ProfileventFiltersInfo />}
      </div>
      <BurgerMenu />
    </header>
  )
}

export default Header