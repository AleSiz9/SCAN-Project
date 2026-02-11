import RequestData from "./requstData/requestData"
import PlanOptions from "./pricingPlans/planOptions"
import { dataRate, dataTable } from "../../../appData/appData"
import Advantage from "./advantage/advantage"

const Main = () => {
  return (
    <main className="main">
      <RequestData />
      <Advantage table={dataTable} />
      <PlanOptions plans={dataRate} />
    </main>
  )
}

export default Main