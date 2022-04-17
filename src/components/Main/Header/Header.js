import styles from "./Header.module.css";
import search from '../../../assets/search.svg'
import WeekNav from "./WeekNav/WeekNav";

const Header = (props) => {
  const {currentDate, daily} = props;
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
      <WeekNav day={currentDate} daily={daily} handleDayClick={props.handleDayClick}/>
    </header>
  );
};

export default Header;
