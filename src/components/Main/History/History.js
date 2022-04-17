import styles from './History.module.css';
import formatDate from "../../../utils/format-date";
import {useContext} from "react";
import FormatterContext from "../../../context/formatter-context";

const History = (props) => {
  const formatter = useContext(FormatterContext);
  const {dailyHistory} = props;
  let income = 0;
  let expense = 0;
  let net = 0;
  for (let entry of dailyHistory) {
    if (entry.type === 'income') {
      income += entry.value;
    } else {
      expense += entry.value;
    }
  }
  net = income - expense;
  return (
    <div className={styles.history}>
      <header>
        <p>
          <span>Total income</span>
          <span>{formatter.format(income)}</span>
        </p>
        <p>
          <span>Total expense</span>
          <span>{formatter.format(expense)}</span>
        </p>
        <p>
          <span>Net</span>
          <span>{formatter.format(net)}</span>
        </p>
      </header>
      <div className={styles.entries}>
        {dailyHistory.length > 0 ? dailyHistory.map(entry => (
          <div className={styles.entry} key={String(entry.timestamp)}>
            <div className={styles.entryData}>
              <h3 className={styles.entryTitle}>{entry.name}</h3>
              <p className={styles.entryTime}>{formatDate(entry.timestamp)}</p>
            </div>
            <div>
              <p className={styles.entryValue}>{`${entry.type === 'income' ? '+' : ''}${formatter.format(entry.value)}`}</p>
            </div>
          </div>
        )) : <p>There is nothing here...</p>}
      </div>
    </div>
  )
}
export default History;