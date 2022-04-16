import styles from './MonthlyOverview.module.css';
import StatisticsBlock from "./StatisticsBlock/StatisticsBlock";

const MonthlyOverview = (props) => {
  const {monthly, formatter} = props;
  const expense_data = monthly.map((month, index) => ({
    value: month.expense,
    name: month.date,
  }))
  const income_data = monthly.map((month, index) => ({
    value: month.income,
    name: month.date,
  }))
  return (
    <div className={styles.monthlyOverview}>
      <h1>Monthly overview</h1>
      <div className={styles.monthlyOverviewBlocks}>
        <StatisticsBlock formatter={formatter} data={expense_data} title={'expense'} barColor={'#F58235'}/>
        <StatisticsBlock formatter={formatter} data={income_data} title={'income'} barColor={'#26bc41'}/>
      </div>
    </div>
  )
}

export default MonthlyOverview;