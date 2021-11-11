import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import selectCategories from "../../selectors/select-categories";
import selectCurrency from "../../selectors/select-currency";
import selectBudget from "../../selectors/select-budget";
import {setMontlyBudget} from "../../reducers/root-reducer";
import changeCurrency from "../../thunks/change-currency";
import Select from "../../common/Select/Select";
import avatar from '../../assets/avatar.svg';
import gear from '../../assets/gear.svg';
import {useSpring, animated} from "react-spring";
import styles from './ControlPanel.module.css';
import {useFormik} from "formik";

const ControlPanel = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const currentCurrency = useSelector(selectCurrency);
  const currencies = ['USD', 'RUB', 'KZT'];
  const budget = useSelector(selectBudget);
  const [popupState, setPopupState] = useState(false)
  const popupAnimation = useSpring({
    from: {
      opacity: 0,
      scale: 0.8
    },
    to: {
      opacity: popupState ? 1 : 0,
      scale: popupState ? 1 : 0.8,
    }
  })
  const handleClose = () => setPopupState(false);
  const handleOpen = () => setPopupState(!popupState);
  const formik = useFormik({
    initialValues: {
      budget: budget ? budget.value : 500,
      currency: currentCurrency ? currentCurrency : 'USD',
    },
    onSubmit: (values) => {
      dispatch(setMontlyBudget(values.budget));
      dispatch(changeCurrency(currentCurrency, values.currency));
      setPopupState(false);
    },
  })
  const handleCurrencyChange = (value) => {
    formik.values.currency = value;
  }
  return (
    <div className={styles.controlPanel}>
      <animated.div className={styles.settingsWindow} style={{
        opacity: popupAnimation.opacity,
        zIndex: popupAnimation.opacity.to(o => o === 0 ? -10 : 10),
        transform: popupAnimation.scale.to(scale => `scale(${scale})`),
      }}>
        <header>
          <h1>Settings</h1>
          <button onClick={handleClose}>&times;</button>
        </header>
        <main>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="budget">Monthly budget</label>
            <input type="number" name='budget' placeholder="Budget" value={formik.values.budget} onChange={formik.handleChange}/>
            <label htmlFor="currency">Currency</label>
            <div className={styles.currency}>
              <Select options={currencies} placeholder={currencies.indexOf(currentCurrency)} onChange={handleCurrencyChange}/>
            </div>
            <button type="submit">Save</button>
          </form>
        </main>
      </animated.div>
      <div className={styles.profile}>
        <img src={avatar} alt="Avatar" className={styles.avatar}/>
        <p>aumirzakov</p>
      </div>
      <div className={styles.categories}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categories).map(category => <li key={category}>{category}</li>)}
        </ul>
      </div>
      <p>This is still work in progress :)</p>
      <button className={styles.settings} onClick={handleOpen}><img src={gear} alt={'Settings'}/></button>
    </div>
  )
}

export default ControlPanel;