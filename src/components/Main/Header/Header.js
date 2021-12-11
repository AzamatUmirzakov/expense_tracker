import { useState } from "react";
import styles from "./Header.module.css";
import search from '../../../assets/search.svg'
import searchMultiple from "../../../utils/search-multiple";
import WeekNav from "./WeekNav/WeekNav";
import {animated, useSpring} from "react-spring";
import formatDate from "../../../utils/format-date";

const Header = (props) => {
  const handleDayClick = (date) => {
    props.handleHistorySwitch(date.toDateString());
  };
  // search input
  const entries = props.entries;
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  };
  const handleSearch = () => {
    setSearchResults(searchMultiple(entries, query));
    setPopupState(true);
  }
  const [popupState, setPopupState] = useState(false);
  const popupAnimation = useSpring({
    opacity: popupState ? 1 : 0,
    scale: popupState ? 1 : 0.8,
  });
  const handlePopupClose = () => {
    setPopupState(false);
    handleQueryChange({
      target: {
        value: ""
      }
    })
  }
  const handleResultClick = (date) => {
    handleDayClick(date);
    handlePopupClose();
  }
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1>Daily Transactions</h1>
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" value={query} onChange={handleQueryChange}/>
        <button onClick={handleSearch}><img src={search} alt="Search"/></button>
        <button onClick={props.handlePopupToggle}>+</button>
      </div>
      <animated.div className={styles.results} style={{
        opacity: popupAnimation.opacity,
        zIndex: popupAnimation.opacity.to((o) => (o === 0 ? -20 : 20)),
        transform: popupAnimation.scale.to((scale) => `scale(${scale})`),
      }}>
        <header>
          <h1>Results</h1>
          <button onClick={handlePopupClose}>&times;</button>
        </header>
        <ul>
          {searchResults.map(entry => (
            <div className={styles.entry} key={String(entry.timestamp)} onClick={() => handleResultClick(entry.timestamp)}>
              <div className={styles.entryData}>
                <h3 className={styles.entryTitle}>{entry.name}</h3>
                <p className={styles.entryTime}>{formatDate(entry.timestamp)}</p>
              </div>
              <div>
                <p className={styles.entryValue}>{`${entry.type === 'income' ? '+' : ''}${entry.value}$`}</p>
              </div>
            </div>
            ))}
        </ul>
      </animated.div>
      <WeekNav handleDayClick={handleDayClick}/>
    </header>
  );
};

export default Header;
