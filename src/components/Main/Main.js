import {useSelector} from "react-redux";
import styles from './Main.module.css';
import selectTodayHistory from "../../selectors/select-today-history";
import Header from "./Header/Header";
import History from "./History/History";

const Main = (props) => {
  const dailyHistory = useSelector(selectTodayHistory);
  return (
    <div className={styles.main}>
      <Header/>
      <History dailyHistory={dailyHistory}/>
    </div>
  )
}

export default Main;