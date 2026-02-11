import TariffCard from "./tariffCard"

const PlanOptions = (props) => {
  const {
    plans = [],
  } = props

  return (
    <section className="content-pricing-section">
      <div id="tarif"><h2>Наши тарифы</h2></div>
      <ul className="content-pricing-plans">
        {plans.map((rate) => (
          <TariffCard
            key={rate.id}
            cardName={rate.cardName}
            credit={rate.credit}
            isActive={rate.isActive}
            price={rate.price}
            sale={rate.sale}
            id={rate.id}
            imgUrl={rate.imgUrl}
            subTitle={rate.subTitle}
            listItems={rate.ul}
          />
        ))}
      </ul>
    </section>
  )
}

export default PlanOptions