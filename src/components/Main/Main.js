import { useSelector, useDispatch } from "react-redux";
import styles from "./Main.module.css";
import selectHistory from "../../selectors/select-history";
import Header from "./Header/Header";
import History from "./History/History";
import { addEntry, switchHistory } from "../../reducers/root-reducer";
import SubmitForm from "./SubmitForm/SubmitForm";
import {useState} from "react";
import selectCurrentFilter from "../../selectors/select-current-filter";
import selectEntries from "../../selectors/select-entries";
import searchMultiple from "../../utils/search-multiple";
import {animated, useSpring} from "react-spring";
import formatDate from "../../utils/format-date";

const Main = (props) => {
  const { entries } = useSelector(selectHistory);
  const currentFilter = useSelector(selectCurrentFilter);
  const filter = entry => {
    if (currentFilter === '') return true;
    return entry.category === currentFilter;
  }
  const filtered = entries.filter(filter);
  const dispatch = useDispatch();
  const handleEntrySubmit = (values) => {
    if (values.category === "") {
      values.category = "Miscellaneous";
    }
    dispatch(addEntry(values));
  };
  const handleHistorySwitch = (date) => {
    dispatch(switchHistory(date));
  };
  const [popupState, setPopupState] = useState(false);
  const handlePopupToggle = () => {
    setPopupState(!popupState);
  }
  const [searchResults, setSearchResults] = useState([]);
  const searchEntries = useSelector(selectEntries);
  const handleSearch = () => {
    setSearchResults(searchMultiple(searchEntries, query));
    setSearchPopupState(true);
  }
  const [query, setQuery] = useState('');
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  };
  const [searchPopupState, setSearchPopupState] = useState(false);
  const popupAnimation = useSpring({
    opacity: searchPopupState ? 1 : 0,
    scale: searchPopupState ? 1 : 0.8,
  });
  const handleSearchPopupClose = () => {
    setSearchPopupState(false);
    handleQueryChange({
      target: {
        value: ""
      }
    })
  }
  const handleDayClick = (date) => {
    handleHistorySwitch(date.toDateString());
  };
  const handleResultClick = (date) => {
    handleDayClick(date);
    handleSearchPopupClose();
  }
  return (
    <div className={styles.main}>
      <Header
        handlePopupToggle={handlePopupToggle}
        handleHistorySwitch={handleHistorySwitch}
        handleSearch={handleSearch}
        query={query}
        handleQueryChange={handleQueryChange}
        handleDayClick={handleDayClick}
      />
      <SubmitForm popupState={searchPopupState} setPopupState={setSearchPopupState} handleEntrySubmit={handleEntrySubmit}/>
      <History dailyHistory={filtered} />
      <animated.div className={styles.results} style={{ opacity: popupAnimation.opacity,
        zIndex: popupAnimation.opacity.to((o) => (o === 0 ? -20 : 20)),
        transform: popupAnimation.scale.to((scale) => `scale(${scale})`),
      }}>
        <header>
          <h1>Results</h1>
          <button onClick={handleSearchPopupClose}>&times;</button>
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
    </div>
  );
};

export default Main;
