//// Imports
const path = require("path");
const csvToJson = require("csvtojson");
const Utilities = require("../utilities/index");

const filePath = path.join(__dirname, "data/googleFi/callData.csv");

// const main = async () => {
//   const totalTimeOnCallWithPerson = await getTotalTimeOnCallWithPerson(
//     filePath
//   );
//   console.log(totalTimeOnCallWithPerson);
// };

// main(searchDir, filters);

/**
 * doesn't work as expected
 * hours/minutes/seconds parsing pattern unclear - clarification required
 * @param {*} filePath
 * @returns
 */
const getTotalTimeOnCallWithPerson = async (filePath) => {
  const data = await csvToJson().fromFile(filePath);
  let totalSeconds = 0;

  for (const entry of data) {
    if (entry.Phone === "(239) 821-3609" && entry.Duration !== "") {
      const [hours, minutes, seconds = 0] = entry.Duration.split(":");
      totalSeconds +=
        parseInt(seconds) +
        parseInt(minutes * 60) +
        parseInt(hours * 60 * 60 || 0);
    }
  }

  return Utilities.HelpersDateTime.convertSecondsToHours(totalSeconds);
};

module.exports = {
  getTotalTimeOnCallWithPerson,
};
