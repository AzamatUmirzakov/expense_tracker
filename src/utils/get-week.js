const getWeek = (date) => {
  let currentDay = date.getDay() - 1;
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  let currentDate = date.getDate();
  if (currentDay < 0) currentDay = 6;
  let result = [];
  for (let i = 0; i < 7; i++) {
    result.push(
      new Date(currentYear, currentMonth, currentDate + (i - currentDay))
    );
  }
  return result;
};

export default getWeek;
