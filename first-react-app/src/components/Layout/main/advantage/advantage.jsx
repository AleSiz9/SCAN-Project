import React, { useEffect, useRef, useState } from "react"
import styles from '../advantage/advantage.module.css'

const CardAdvantage = (props) => {
  const {
    imgUrl,
    title,
  } = props

  return (
    <div className={`${styles.cards} `}>
      <div className={styles.cards__content}>
        <img
          src={imgUrl}
          alt=""
          style={{ width: '64px', height: '64px' }} />
        <p>
          {title}
        </p>
      </div>
    </div>
  )
}


const Advantage = (props) => {
  const scroll = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const {
    table = []
  } = props

  useEffect(() => {
    const updatePrevCards = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerView(3)
      } else if (width >= 700) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }
    updatePrevCards()
    window.addEventListener('resize', updatePrevCards)
    return () => window.removeEventListener('resize', updatePrevCards)
  })

  const next = () => {
    const cardCount = table.length;
    const newIndex = (currentIndex + cardsPerView) % cardCount;
    setCurrentIndex(newIndex)
  }
  const prev = () => {
    const cardCount = table.length;
    const newIndex = (currentIndex + cardsPerView + cardCount) % cardCount;
    setCurrentIndex(newIndex)
  }
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % table.length;
      visibleCards.push(table[index]);
    }
    return visibleCards;
  };

  return (
    <section className={styles.advantage}>
      <h2>
        Почему именно мы
      </h2>
      <div className={styles.scrool}>
        <button onClick={prev} className={styles.button}>
          <img src="images/nextscroll.svg" alt="" />
        </button>
        <div className={styles.cardsContainer} ref={scroll}>
          {getVisibleCards().map((tab, index) => (
            <CardAdvantage
              key={index}
              imgUrl={tab.imgUrl}
              title={tab.title}
            />
          ))}
        </div>
        <button onClick={next} className={styles.button}>
          <img src="images/prevscroll.svg" alt="" />
        </button>
      </div>
      <div className={styles.img}>
        <img
          src="/images/photo-section2.png"
          alt=""
          style={{ maxWidth: '86vw', maxHeight: '66vh' }}
        />
      </div>
    </section>
  )
}

export default Advantage