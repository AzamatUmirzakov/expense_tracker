import styles from "./Preloader.module.css";
import loading from "../../assets/loading.svg";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img alt="Loading..." src={loading} />
    </div>
  );
};

export default Preloader;
