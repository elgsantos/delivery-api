const StringToDate = (dateString) => {
  const date = new Date(dateString);
  date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return date;
};

module.exports = {
  StringToDate
};
