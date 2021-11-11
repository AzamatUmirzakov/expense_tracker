import styles from './History.module.css';
import formatDate from "../../../utils/format-date";

const History = (props) => {
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
          <span>{income}$</span>
        </p>
        <p>
          <span>Total expense</span>
          <span>{expense}$</span>
        </p>
        <p>
          <span>Net</span>
          <span>{net}$</span>
        </p>
      </header>
      <div className={styles.entries}>
        {dailyHistory.map(entry => (
          <div className={styles.entry} key={String(entry.timestamp)}>
            <div className={styles.entryData}>
              <h3 className={styles.entryTitle}>{entry.name}</h3>
              <p className={styles.entryTime}>{formatDate(entry.timestamp)}</p>
            </div>
            <div>
              <p className={styles.entryValue}>{`${entry.type === 'income' ? '+' : ''}${entry.value}$`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default History;