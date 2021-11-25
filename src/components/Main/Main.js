import { useSelector, useDispatch } from "react-redux";
import styles from "./Main.module.css";
import selectHistory from "../../selectors/select-history";
import Header from "./Header/Header";
import History from "./History/History";
import { addEntry, switchHistory } from "../../reducers/root-reducer";
import SubmitForm from "./SubmitForm/SubmitForm";
import {useState} from "react";

const Main = (props) => {
  const { entries } = useSelector(selectHistory);
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
  return (
    <div className={styles.main}>
      <Header
        handlePopupToggle={handlePopupToggle}
        handleHistorySwitch={handleHistorySwitch}
      />
      <SubmitForm popupState={popupState} setPopupState={setPopupState} handleEntrySubmit={handleEntrySubmit}/>
      <History dailyHistory={entries} />
    </div>
  );
};

export default Main;
