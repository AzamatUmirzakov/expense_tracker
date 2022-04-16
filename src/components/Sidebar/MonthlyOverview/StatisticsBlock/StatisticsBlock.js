import styles from './StatisticsBlock.module.css';
import classNames from "classnames";

const StatisticsBlock = (props) => {
  const {data} = props;
  const {title, customClass, barColor} = props;

  let max = {
    name: '',
    value: 0,
    index: 0
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].value > max.value) {
      max.value = data[i].value;
      max.name = data[i].name;
      max.index = i;
    }
  }

  let latest = data.slice(Math.max(0, data.length - 6));
  let latest_heights = [];
  for (let item of latest) {
    latest_heights.push(Math.round((item.value * 100) / max.value));
  }

  let difference = null;

  const current = data[data.length - 1];
  const beforeCurrent = data[data.length - 2];
  if (current && beforeCurrent)  {
    difference = current.value - beforeCurrent.value;
    if (difference > 0) {
      difference = `+${difference}`;
    }
  }
  return (
    <div className={classNames(styles.statisticsBlock, customClass)}>
      <h1>{title}</h1>
      <div className={styles.infographics}>
        {latest_heights.map((height, index) => (
          <div key={index} className={classNames(styles.bar, {
            [styles.barActive]: index === latest_heights.length - 1
          })} style={{
            height: height + "%",
            backgroundColor: barColor,
          }}/>
        ))}
      </div>
      <h2>{current ? `${props.formatter.format(current.value)}` : ''}</h2>
      <h3 style={{color: barColor}}>{difference ? `${difference}$` : ''}</h3>
    </div>
  )
}
export default StatisticsBlock;