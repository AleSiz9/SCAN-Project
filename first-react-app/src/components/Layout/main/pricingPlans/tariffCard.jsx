import { useAuth } from "../../../../authService/authService";

const TariffCard = (props) => {
  const { isAuthenticated, user } = useAuth();

  const {
    cardName,
    id,
    credit,
    price,
    isActive,
    sale,
    imgUrl,
    subTitle,
    listItems
  } = props;

  return (
    <li key={id} className={`plans-card__li-${id}`}>
      <div>
        <div className={`card-li header-${id}__color`}>
          <div className={`card-title-${id}`}>
            <h3 className={`title-${id}`}>{cardName}</h3>
            <p className={`subtitle-${id}`}>{subTitle}</p>
          </div>
          <div className={`card-img-${id}`}>
            <img
              src={imgUrl}
              alt={cardName}
            />
          </div>
        </div>
        {isActive && isAuthenticated && user ? (
          <div className="plans__active-indicator">
            <p>Текущий тариф
            </p>
          </div>
        ) : ('')
        }
        <div className="price-section">
          <p className="price-section-rate">
            {sale} ₽
            <span className="strikethrough">
              {price} ₽
            </span>
          </p>
          {id !== "business" && (
            <p className="price-section-credit">
              или {credit} ₽/мес. при рассрочке на 24 мес.
            </p>
          )}
        </div>
        <div className={`service-section-${id}`}>
          <h4>В тариф входит:</h4>
          <ul className="tariff-service">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <a href="##"
          className={`${isActive && isAuthenticated && user ?
            "plans-detail active" : "plans-detail"}`
          }>
          {isActive && isAuthenticated && user ?
            "Перейти в личный кабинет" : "Подробнее"
          }
        </a>
      </div>
    </li>
  );
}

export default TariffCard;
