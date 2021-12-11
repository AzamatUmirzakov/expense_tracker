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
  const currentDate = new Date();
  return (
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
            onClick={() => props.handleDayClick(day)}
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
  )
}

export default WeekNav;