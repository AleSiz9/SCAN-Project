import { Link } from "react-router-dom";
import { useAuth } from "../../../../authService/authService";
import { FormSkeleton } from "../../../skeleton/skeleton";
import styles from "./requestData.module.css"

const RequestData = () => {
  const { isAuthenticated, loading, user } = useAuth();
  if(loading) return <div><FormSkeleton /></div>
  
  return (
    <section className={styles.content__description}>
      <div className={styles.description__title}>
        <div className={styles.description__text}>
          <p className={styles.text__textBold}>
            Cервис по поиску
            <br />публикаций
            <br />о компании
            <br />по его ИНН
          </p>
          <p className={styles.text__textRegular}>
            Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
          </p>
        </div>
        <div className={styles.form}>
          <Link to={isAuthenticated && user ? "/search" : "/login"} 
          className={styles.btn}
          href="##">
            Запросить данные
          </Link>
        </div>
      </div>
      <div className={styles.title__img}>
        <img
          src="/images/description.png"
          alt=""
          style={{ maxWidth: "100%" }}
        />
      </div>
    </section>
  )
}

export default RequestData