import Select from "../../common/Select/Select";
import styles from './ControlPanel.module.css';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import selectCategories from "../../selectors/select-categories";
import selectCurrency from "../../selectors/select-currency";
import selectCurrentFilter from "../../selectors/select-current-filter";
import setNewCurrency from "../../thunks/set-new-currency";
import {changeFilter} from "../../reducers/root-reducer";

const ControlPanel = (props) => {
  const categories = useSelector(selectCategories)
  const currentCurrency = useSelector(selectCurrency);
  const currentFilter = useSelector(selectCurrentFilter);
  const currencies = ['USD', 'RUB', 'KZT'];
  const dispatch = useDispatch();
  const handleCurrencyChange = (currency) => {
    dispatch(setNewCurrency(currentCurrency, currency));
  }
  const handleFilterChange = (category) => {
    if (currentFilter === category) {
      dispatch(changeFilter(''));
    } else {
      dispatch(changeFilter(category));
    }
  }
  return (
    <div className={classNames(styles.controlPanel, {
      [styles.visible]: props.controlPanelState,
    })}>
      <div className={styles.categories}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map(category => <li className={classNames({[styles.activeCategory]: currentFilter === category})} onClick={() => handleFilterChange(category)} key={category}>{category}</li>)}
        </ul>
      </div>
      <p>Days without any entry history are gray on week navigation, and you can't view them. There is also no monthly view right now, but this is still work in progress :)</p>
      <Select options={currencies} placeholder={currencies.indexOf(currentCurrency)} onChange={handleCurrencyChange}/>
    </div>
  )
}

export default ControlPanel;