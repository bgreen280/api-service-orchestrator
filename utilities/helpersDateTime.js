const convertSecondsToHours = (totalDuration) =>
  new Date(totalDuration * 1000).toISOString().slice(11, 19);

module.exports = {
  convertSecondsToHours,
};
