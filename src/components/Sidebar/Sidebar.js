import {useDispatch, useSelector} from "react-redux";
import selectBudget from "../../selectors/select-budget";
import selectMonthly from "../../selectors/select-monthly";
import selectCategories from "../../selectors/select-categories";
import ProgressBar from "./ProgressBar/ProgressBar";
import MonthlyOverview from "./MonthlyOverview/MonthlyOverview";
import CategoriesOverview from "./CategoriesOverview/CategoriesOverview";
import styles from './Sidebar.module.css';
import classNames from "classnames";
import {setMontlyBudget} from "../../reducers/root-reducer";

const Sidebar = (props) => {
  const budget = useSelector(selectBudget);
  const monthly = useSelector(selectMonthly);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const handleMonthlyBudgetChange = (budget) => {
    dispatch(setMontlyBudget(budget));
  }
  return (
    <div className={classNames(styles.sidebar, {
      [styles.visible]: props.sidebarState,
    })}>
      <header>
        <ProgressBar budget={budget} handleChange={handleMonthlyBudgetChange}/>
      </header>
      <MonthlyOverview monthly={monthly}/>
      <CategoriesOverview categories={categories}/>
    </div>
  )
}

export default Sidebar;