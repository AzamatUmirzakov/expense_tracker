import styles from './CategoriesOverview.module.css';
import Category from "./Category/Category";

const CategoriesOverview = (props) => {
  const { categories } = props;
  let total = 0;
  for (let category in categories) {
    total += categories[category];
  }
  return (
    <div className={styles.overview}>
      <h1>Expenses by category</h1>
      <div className={styles.categories}>
        {Object.keys(categories).map((category) => (
          <Category category={category} value={categories[category]} total={total} key={category}/>
        ))}
      </div>
    </div>
  )
}

export default CategoriesOverview;