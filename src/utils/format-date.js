const determineMonth = (month) => {
  const monthes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthes[month];
};

const formatDate = (timestamp) => {
  const date = timestamp.getDate();
  const month = determineMonth(timestamp.getMonth());
  const year = timestamp.getFullYear();
  const hours =
    timestamp.getHours() < 10
      ? `0${timestamp.getHours()}`
      : timestamp.getHours();
  const minutes =
    timestamp.getMinutes() < 10
      ? `0${timestamp.getMinutes()}`
      : timestamp.getMinutes();

  const result = `${date} ${month}' ${year}, ${hours}:${minutes}`;
  console.log(result);
  return result;
};

export default formatDate;
