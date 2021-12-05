import { useState } from "react";
import getWeek from "../../../utils/get-week";
import classNames from "classnames";
import searchMultiple from "../../../utils/search-multiple";
import styles from "./Header.module.css";
import chevronLeft from "../../../assets/chevron-left.svg";
import chevronRight from "../../../assets/chevron-right.svg";

const Header = (props) => {
  // week navigation
  const [week, setWeek] = useState(new Date());
  const showPreviousWeek = () => {
    setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() - 7))
  };
  const showNextWeek = () => {
    setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() + 7))
  };
  const weekDays = getWeek(week);
  const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const handleDayClick = (date) => {
    props.handleHistorySwitch(date.toDateString());
  };
  // search input
  const entries = props.entries;
  const [query, setQuery] = useState('');
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  };
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1>Daily Transactions</h1>
        <button onClick={props.handlePopupToggle}>+</button>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" value={query} onChange={handleQueryChange}/>
      </div>
      <div className={styles.weekNav}>
        <button onClick={showPreviousWeek}>
          <img src={chevronLeft} alt="Back" />
        </button>
        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div
              className={classNames(styles.weekDay, {
                [styles.active]:
                  day.getDate() === currentDate.getDate() &&
                  day.getMonth() === currentDate.getMonth() &&
                  day.getFullYear() === currentDate.getFullYear(),
              })}
              onClick={() => handleDayClick(day)}
            >
              <div className={styles.weekDayName}>{weekDayNames[day.getDay()]}</div>
              {day.getDate()}
            </div>
          ))}
        </div>
        <button onClick={showNextWeek}>
          <img src={chevronRight} alt="Forward" />
        </button>
      </div>
    </header>
  );
};

export default Header;
