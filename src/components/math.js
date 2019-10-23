const timeToDecimal = (inputTime) => {
  inputTime = String(inputTime);
  const hoursMinutes = inputTime.split(/[.:]/);
  let hours = parseInt(hoursMinutes[0], 10);
  isNaN(hours) || hours == null ? hours = 0 : undefined;
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
};


const decimalToTime = (inputDecimal) => {
  return inputDecimal * 0.6;
};


// Validate input to be number
const isNumber = (validateMe) => {
  return !isNaN(validateMe) || validateMe == null ? Number(validateMe) : false;
};


const getToday = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
};

export {timeToDecimal, decimalToTime, isNumber, getToday};