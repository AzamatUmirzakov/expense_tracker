import {animated, useSpring} from "react-spring";
import styles from './SubmitForm.module.css';
import classNames from "classnames";
import {useFormik} from "formik";

const SubmitForm = (props) => {
  const {popupState} = props;
  const formik = useFormik({
    onSubmit: (values) => {
      props.handleEntrySubmit(values);
      props.setPopupState(false);
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
    opacity: popupState ? 1 : 0,
    scale: popupState ? 1 : 0.8,
  });
  const handleFormClose = () => {
    props.setPopupState(false);
  }
  return (
    <div className={styles.submitForm}>
      <animated.div
        style={{
          opacity: popupAnimation.opacity,
          zIndex: popupAnimation.opacity.to((o) => (o === 0 ? -10 : 10)),
          transform: popupAnimation.scale.to((scale) => `scale(${scale})`),
        }}
        className={classNames(styles.popup)}
      >
        <header>
          <h1>New entry</h1>
          <button onClick={handleFormClose}>&times;</button>
        </header>
        <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="title">Title</label>
          {formik.touched.title ? (formik.errors.title ? <p>{formik.errors.title}</p> : null) : null}
          <input
            value={formik.values.title}
            onChange={formik.handleChange}
            type="text"
            name={"title"}
            placeholder={"Title"}
          />
          <label htmlFor="value">Value</label>
          {formik.touched.value ? (formik.errors.value ? <p>{formik.errors.value}</p> : null) : null}
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
    </div>
  )
}

export default SubmitForm;