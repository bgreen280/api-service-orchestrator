/**
 * Converts a total duration in seconds to a formatted string in HH:mm:ss.
 *
 * @param {number} totalDuration - The total duration in seconds.
 * @returns {string} The formatted time string in HH:mm:ss.
 * @throws {TypeError} Throws if totalDuration is not a number.
 */
const convertSecondsToHours = (totalDuration) => {
  if (typeof totalDuration !== "number" || totalDuration < 0) {
    throw new TypeError("Total duration must be a non-negative number");
  }

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const seconds = totalDuration % 60;

  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const TimeUtils = {
  convertSecondsToHours,
};

module.exports = { convertSecondsToHours, TimeUtils };
