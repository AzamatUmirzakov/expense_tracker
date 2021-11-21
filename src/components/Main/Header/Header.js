import { useState } from "react";
import { useFormik } from "formik";
import getWeek from "../../../utils/get-week";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import styles from "./Header.module.css";
import chevronLeft from "../../../assets/chevron-left.svg";
import chevronRight from "../../../assets/chevron-right.svg";

const Header = (props) => {
  const [popupState, setPopupState] = useState(false);
  const handleClick = () => setPopupState(!popupState);
  const formik = useFormik({
    onSubmit: (values) => {
      props.handleEntrySubmit(values);
      setPopupState(false);
      formik.resetForm();
    },
    validate: (values) => {
      const {title, value} = values;
      let errors = {};
      if (title === '') {
        errors.title = 'Please enter title'
      }
      if (value === '') {
        errors.value = 'Please enter quantity';
      }
      return errors;
    },
    initialValues: {
      title: "",
      value: "",
      type: "expense",
      category: "",
    },
  });
  const popupAnimation = useSpring({
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: popupState ? 1 : 0,
      scale: popupState ? 1 : 0.8,
    },
  });
  const weekDays = getWeek(new Date());
  const currentDate = new Date();
  const handleDayClick = (date) => {
    props.handleHistorySwitch(date.toDateString());
  };
  return (
    <header className={styles.header}>
      <animated.div
        style={{
          opacity: popupAnimation.opacity,
          zIndex: popupAnimation.opacity.to((o) => (o === 0 ? -10 : 10)),
          transform: popupAnimation.scale.to((scale) => `scale(${scale})`),
        }}
        className={classNames(styles.popup, {
          // [styles.popupActive]: popupState
        })}
      >
        <header>
          <h1>New entry</h1>
          <button onClick={handleClick}>&times;</button>
        </header>
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="title">Title</label>
          <p className={styles.error}>{formik.touched.title ? (formik.errors.title ? formik.errors.title : null) : null}</p>
          <input
            value={formik.values.title}
            onChange={formik.handleChange}
            type="text"
            name={"title"}
            placeholder={"Title"}
          />
          <label htmlFor="value">Value</label>
          <p className={styles.error}>{formik.touched.value ? (formik.errors.value ? formik.errors.value : null) : null}</p>
          <input
            value={formik.values.value}
            onChange={formik.handleChange}
            type="number"
            name={"value"}
            placeholder={"Value"}
          />
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name={"category"}
            placeholder={"Miscellaneous"}
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          <div className={styles.radiobuttons}>
            <div>
              <label htmlFor="income-option">Income</label>
              <input
                type="radio"
                onChange={formik.handleChange}
                id={"income-option"}
                name={"type"}
                value={"income"}
                checked={formik.values.type === "income"}
              />
            </div>
            <div>
              <label htmlFor="expense-option">Expense</label>
              <input
                type="radio"
                onChange={formik.handleChange}
                id={"expense-option"}
                name={"type"}
                value={"expense"}
                checked={formik.values.type === "expense"}
              />
            </div>
          </div>
          <button type={"submit"}>Submit</button>
        </form>
      </animated.div>
      <div className={styles.text}>
        <h1>Daily Transactions</h1>
        <button onClick={handleClick}>+</button>
      </div>
      <input type="text" placeholder="Search" />
      <div className={styles.weekNav}>
        <button>
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
              {day.getDate()}
            </div>
          ))}
        </div>
        <button>
          <img src={chevronRight} alt="Forward" />
        </button>
      </div>
    </header>
  );
};

export default Header;
