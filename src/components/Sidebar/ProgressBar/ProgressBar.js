import styles from './ProgressBar.module.css';

const ProgressBar = (props) => {
  const {budget} = props;
  const width = Math.round((budget.spent * 100) / budget.value);
  return (
    <div className={styles.progressBar}>
      <p>{budget.spent} / {budget.value}{budget.currency}</p>
      <div className={styles.bar} style={{
        width: `${width}%`,
        background: width >= 100 ? 'red' : ''
      }}/>
    </div>
  )
}

export default ProgressBar;