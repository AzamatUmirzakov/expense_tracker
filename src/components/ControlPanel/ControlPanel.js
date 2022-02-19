import {useSelector} from "react-redux";
import selectCategories from "../../selectors/select-categories";
import selectCurrency from "../../selectors/select-currency";
import Select from "../../common/Select/Select";
import avatar from '../../assets/avatar.svg';
import styles from './ControlPanel.module.css';
import selectCurrentFilter from "../../selectors/select-current-filter";
import classNames from "classnames";

const ControlPanel = (props) => {
  const categories = useSelector(selectCategories);
  const currentCurrency = useSelector(selectCurrency);
  const currentFilter = useSelector(selectCurrentFilter);
  const currencies = ['USD', 'RUB', 'KZT'];
  const handleCurrencyChange = (currency) => {
    props.handleCurrencyChange(currency);
  }
  return (
    <div className={classNames(styles.controlPanel, {
      [styles.visible]: props.controlPanelState,
    })}>
      {/*<div className={styles.profile}>*/}
      {/*  <img src={avatar} alt="Avatar" className={styles.avatar}/>*/}
      {/*  <p>aumirzakov</p>*/}
      {/*</div>*/}
      <div className={styles.categories}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map(category => <li className={classNames({[styles.activeCategory]: currentFilter === category})} onClick={() => props.handleFilterChange(category)} key={category}>{category}</li>)}
        </ul>
      </div>
      <p>This is still work in progress :)</p>
      <Select options={currencies} placeholder={currencies.indexOf(currentCurrency)} onChange={handleCurrencyChange}/>
    </div>
  )
}

export default ControlPanel;