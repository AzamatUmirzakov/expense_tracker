import styles from './WeekNav.module.css'
import chevronLeft from "../../../../assets/chevron-left.svg";
import classNames from "classnames";
import chevronRight from "../../../../assets/chevron-right.svg";
import {useState} from "react";
import getWeek from "../../../../utils/get-week";

const WeekNav = (props) => {
  const [week, setWeek] = useState(new Date());
  const showPreviousWeek = () => {
    setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() - 7))
  };
  const showNextWeek = () => {
    setWeek(new Date(week.getFullYear(), week.getMonth(), week.getDate() + 7))
  };
  const weekDays = getWeek(week);
  const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  const current = new Date(props.day);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div className={styles.wrapper}>
      <div className={styles.weekNav}>
        <button onClick={showPreviousWeek}>
          <img src={chevronLeft} alt="Back" />
        </button>
        <div className={styles.weekDays}>
          {weekDays.map((day) => (
            <div
              key={day.toDateString()}
              className={classNames(styles.weekDay, {
                [styles.today]:
                  (day.getDate() === today.getDate() &&
                   day.getMonth() === today.getMonth() &&
                   day.getFullYear() === today.getFullYear()),
                [styles.active]:
                  (day.getDate() === current.getDate() &&
                   day.getMonth() === current.getMonth() &&
                   day.getFullYear() === current.getFullYear()),
                [styles.empty]: !props.daily[day.toDateString()]
              })}
              onClick={() => props.handleDayClick(day)}
            >
              <div className={styles.weekDayName}>{weekDayNames[day.getDay()]}</div>
              <p className={styles.weekDayDate}>{day.getDate()}</p>
            </div>
          ))}
        </div>
        <button onClick={showNextWeek}>
          <img src={chevronRight} alt="Forward" />
        </button>
      </div>
      <p>{monthNames[weekDays[0].getMonth()]}</p>
    </div>
  )
}

export default WeekNav;