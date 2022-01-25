import {animated} from "react-spring";
import styles from "./SearchPopup.module.css";
import formatDate from "../../../utils/format-date";

const SearchPopup = ({popupAnimation, handleSearchPopupClose, handleResultClick, searchResults}) => {
  return (
    <animated.div className={styles.results} style={{ opacity: popupAnimation.opacity,
      zIndex: popupAnimation.opacity.to((o) => (o === 0 ? -20 : 20)),
      transform: popupAnimation.scale.to((scale) => `scale(${scale})`),
    }}>
      <header>
        <h1>Results</h1>
        <button onClick={handleSearchPopupClose}>&times;</button>
      </header>
      <ul>
        {searchResults.map(entry => (
          <div className={styles.entry} key={String(entry.timestamp)} onClick={() => handleResultClick(entry.timestamp)}>
            <div className={styles.entryData}>
              <h3 className={styles.entryTitle}>{entry.name}</h3>
              <p className={styles.entryTime}>{formatDate(entry.timestamp)}</p>
            </div>
            <div>
              <p className={styles.entryValue}>{`${entry.type === 'income' ? '+' : ''}${entry.value}$`}</p>
            </div>
          </div>
        ))}
      </ul>
    </animated.div>
  )
}

export default SearchPopup;