import { useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoUserContent, LoginButton } from './headerAuthStatus';
import { useAuth } from '../../../authService/authService';
import Loader from '../../UI/loader';
import styles from './header.module.css'

const AuthStatus = () => {
  const { isAuthenticated, loading, user } = useAuth();
  const shouldShowUser = !loading && isAuthenticated && user;
  if (loading) return <Loader />
  if (shouldShowUser) {
    return (
      <>
        <InfoUserContent />
      </>
    )
  }
  return <LoginButton />
}

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.burger__menu}>
      <button
        className={`${styles.burger__button} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={
          `${styles.burger__overlay} 
          ${isOpen ? styles.active : ''}
        `}
          onClick={() => setIsOpen(false)
        }>
      </div>
      <div className={`${styles.burger__content} ${isOpen ? styles.active : ''}`}>
        <button className={styles.burger__close} onClick={() => setIsOpen(false)}>
          ×
        </button>
        <nav className={styles.burger__nav}>
          <Link to="/" onClick={() => setIsOpen(false)}>Главная</Link>
          <a href="#tarif" onClick={() => setIsOpen(false)}>Тарифы</a>
          <a href="##" onClick={() => setIsOpen(false)}>FAQ</a>
        </nav>
        <div className={styles.burger__auth}>
          <AuthStatus />
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu