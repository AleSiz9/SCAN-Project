import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../../authService/authService"
import Button from "../../UI/button";
import styles from "./header.module.css"
import Loader from "../../UI/loader";
import { useEffect, useState } from "react";
import { fetchAccountInfo } from "../../../services/searchApi";

export const HeaderAuthStatus = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div><Loader /></div>
  }

  const shouldShowUser = !loading && isAuthenticated && user;

  if (shouldShowUser) {
    return (
      <>
        <ProfileventFiltersInfo />
        <InfoUserContent />
      </>
    )
  }

  return <LoginButton />
}

export const ProfileventFiltersInfo = () => {
  const [limits, setLimits] = useState(<Loader />)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAccountInfo = async () => {
      try {
        const data = await fetchAccountInfo();
        if (data) {
          setLimits(data)
        } else {
          setError('Не удалось загрузить данные')
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };
    loadAccountInfo();
    const interval = setInterval(loadAccountInfo, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.profilTitle__eventInfo}>
      <div className={styles.eventInfo}>
        {loading ? (
          <div><Loader /></div>
        ) : (
          <>
            <p className={styles.eventInfo__companiCoun}>
              Испотльзовано компаний
              <span className={styles.companycount__colorBlack}>
                {limits.usedCompanyCount}
              </span>
            </p>
            <p className={styles.eventInfo__companiLimit}>
              Лимит по компаниям
              <span className={styles.companylimit__colorGrin}>
                {limits.companyLimit}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export const InfoUserContent = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className={styles.profilTitle__name}>
      <div>
        <Link to={"/search"}>Алексей А.</Link>
        <Button type="submit" variant="secondary" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
      <Link aria-hidden to={"/search"}>
        <img src="/iconProfil/alekseiA.png" alt="Фото Профиля" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      </Link>
    </div>
  )
}

export const LoginButton = () => {
  return (
    <div className={styles.button}>
      <Link to="/login" className={styles.button__hint}>
        Зарегистрироваться
      </Link>
      <Link className={styles.button__end} to="/login">Войти</Link>
    </div>
  )
}


