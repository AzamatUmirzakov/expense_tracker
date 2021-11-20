import { useSelector, useDispatch } from "react-redux";
import styles from "./Main.module.css";
import selectHistory from "../../selectors/select-history";
import Header from "./Header/Header";
import History from "./History/History";
import { addEntry, switchHistory } from "../../reducers/root-reducer";

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
  return (
    <div className={styles.main}>
      <Header
        handleEntrySubmit={handleEntrySubmit}
        handleHistorySwitch={handleHistorySwitch}
      />
      <History dailyHistory={entries} />
    </div>
  );
};

export default Main;
