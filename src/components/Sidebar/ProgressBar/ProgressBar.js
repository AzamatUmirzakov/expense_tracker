import styles from './ProgressBar.module.css';
import {useState} from "react";

const ProgressBar = (props) => {
  const {budget} = props;
  const width = Math.round((budget.spent * 100) / budget.value);
  const [inputState, setInputState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => setInputValue(event.target.value);
  const handleClick = () => {
    setInputState(true);
  }
  const handleBlur = () => {
    setInputState(false);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleChange(parseFloat(inputValue));
    setInputState(false);
  }
  return (
    <button className={styles.progressBar} onClick={handleClick}>
      {!inputState ? (
        <>
          <div className={styles.cover} onSubmit={handleSubmit}>
            Change monthly budget
          </div>
          <p>{budget.spent} / {budget.value}{budget.currency}</p>
          <div className={styles.bar} style={{
            width: `${width}%`,
            background: width >= 100 ? 'red' : ''
          }}/>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="number" value={inputValue} onChange={handleChange} placeholder="New monthly budget..." onBlur={handleBlur} autoFocus/>
        </form>
      ) }
    </button>
  )
}

export default ProgressBar;