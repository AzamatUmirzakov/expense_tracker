import styles from './Category.module.css';

const Category = (props) => {
  const { category, value, total } = props;
  const percentage = Math.round((value * 100) / total);
  return (
    <div className={styles.category}>
      <div className={styles.text}>
        <h2>{category}</h2>
        <h3>{value}$</h3>
      </div>
      <p className={styles.percentage}>{percentage}%</p>
    </div>
  )
}

export default Category;