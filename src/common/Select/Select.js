import {useRef, useState} from "react";
import {useSpring, animated} from "react-spring";
import classNames from "classnames";
import chevronDown from './../../assets/chevron-down.svg';
import styles from './Select.module.css';

const Select = (props) => {
  const { options, onChange } = props;
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState(options[props.placeholder ? props.placeholder : 0]);
  const handleClick = () => setToggle(!toggle);
  const handleSelect = (event) => {
    setValue(event.target.innerHTML)
    if (onChange) {
      onChange(event.target.innerHTML);
    }
  };
  // fucking with animation
  let optionsList = useRef(null);
  let minHeight = 0;
  if (optionsList.current)  {
    minHeight = options.length * (parseFloat(window.getComputedStyle(optionsList.current.querySelector('li')).height) + 2 * parseFloat(window.getComputedStyle(optionsList.current.querySelector('li')).paddingTop)) + parseFloat(window.getComputedStyle(optionsList.current.firstElementChild).marginTop);
  }
  const spring = useSpring({
    height: toggle ? minHeight: 0,
  })

  return (
    <div className={classNames(styles.select, {
      [styles.active]: toggle,
    })} onClick={handleClick}>
      <div className={styles.cover}>
        {value} <img src={chevronDown} alt={''}/>
      </div>
      <animated.ul ref={optionsList} style={{
        ...spring,
        opacity: spring.height.to((h) => h === 0 ? 0 : 1),
      }} className={styles.options} >
        {options.map(option => (<li onClick={handleSelect} key={option}>{option}</li>))}
      </animated.ul>
    </div>
  )
}

export default Select;