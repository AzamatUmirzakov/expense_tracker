import { useSelector } from "react-redux";
import selectBudget from "../../selectors/select-budget";
import selectMonthly from "../../selectors/select-monthly";
import selectCategories from "../../selectors/select-categories";
import ProgressBar from "./ProgressBar/ProgressBar";
import MonthlyOverview from "./MonthlyOverview/MonthlyOverview";
import CategoriesOverview from "./CategoriesOverview/CategoriesOverview";
import styles from './Sidebar.module.css';

const Sidebar = (props) => {
  const budget = useSelector(selectBudget);
  const monthly = useSelector(selectMonthly);
  const categories = useSelector(selectCategories);
  return (
    <div className={styles.sidebar}>
      <header>
        <ProgressBar budget={budget}/>
      </header>
      <MonthlyOverview monthly={monthly}/>
      <CategoriesOverview categories={categories}/>
    </div>
  )
}

export default Sidebar;