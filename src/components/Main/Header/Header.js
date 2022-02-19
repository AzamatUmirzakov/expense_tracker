import styles from "./Header.module.css";
import search from '../../../assets/search.svg'
import WeekNav from "./WeekNav/WeekNav";
import {useSelector} from "react-redux";
import selectHistory from "../../../selectors/select-history";
import selectDaily from "../../../selectors/select-daily";

const Header = (props) => {
  const history = useSelector(selectHistory);
  const daily = useSelector(selectDaily);
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1>Daily Transactions</h1>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" value={props.query} onChange={props.handleQueryChange}/>
        <button onClick={props.handleSearch}><img src={search} alt="Search"/></button>
        <button onClick={props.handlePopupToggle}>+</button>
      </div>
      <WeekNav day={history.date} daily={daily} handleDayClick={props.handleDayClick}/>
    </header>
  );
};

export default Header;
