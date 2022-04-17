import {useDispatch, useSelector} from "react-redux";
import styles from "./Main.module.css";
import Header from "./Header/Header";
import History from "./History/History";
import { addEntry, switchHistory } from "../../reducers/root-reducer";
import SubmitForm from "./SubmitForm/SubmitForm";
import {useState} from "react";
import searchMultiple from "../../utils/search-multiple";
import {useSpring} from "react-spring";
import SearchPopup from "./SearchPopup/SearchPopup";
import selectCurrentFilter from "../../selectors/select-current-filter";
import selectHistory from "../../selectors/select-history";
import selectEntries from "../../selectors/select-entries";
import selectDaily from "../../selectors/select-daily";

const Main = (props) => {
  // filtering entries by category
  const currentFilter = useSelector(selectCurrentFilter);
  const history = useSelector(selectHistory);
  const {entries} = history;
  const daily = useSelector(selectDaily);
  const filter = entry => {
    if (currentFilter === '') return true;
    return entry.category === currentFilter;
  }
  const filtered = entries.filter(filter);
  const dispatch = useDispatch();
  // submitting new entry
  const handleEntrySubmit = (values) => {
    if (values.category === "") {
      values.category = "Miscellaneous";
    }
    dispatch(addEntry(values));
  };
  // switching to other day's history
  const handleHistorySwitch = (date) => {
    dispatch(switchHistory(date));
  };
  // submit form popup's animation
  const [popupState, setPopupState] = useState(false);
  const handlePopupToggle = () => {
    setPopupState(!popupState);
  }
  // search
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
        currentDate={history.date}
        daily={daily}
      />
      <SubmitForm popupState={popupState} setPopupState={setPopupState} handleEntrySubmit={handleEntrySubmit}/>
      <SearchPopup searchResults={searchResults} popupAnimation={popupAnimation} handleSearchPopupClose={handleSearchPopupClose} handleResultClick={handleResultClick}/>
      <History dailyHistory={filtered} />
    </div>
  );
};

export default Main;
