import React from "react"
import styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img
            src="images/logoFooter.svg"
            alt="Логотип СКАН"
          />
        </div>
        <div className={styles.info}>
          <address>
            <p>
              г. Москва, Цветной б-р, 40
            </p>
            <a href="tel:+74957712111">
              +7 (495) 771 21 11
            </a>
            <a href="mailto:info@skan.ru">
              info@skan.ru
            </a>
          </address>
          <span>Copyright. 2022</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer