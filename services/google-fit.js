//// Imports
const path = require("path");
const Utilities = require("../utilities/index");

// PARAMS
const searchDir = path.join(__dirname, "/data/googleFit");
const filters = {
  year: "2023",
  activity: "MEDITATION",
};

// // MAIN
// const main = async (searchDir, filters) => {
//   const activityTypes = getActivityTypes(searchDir);
//   console.log(activityTypes);
//   const totalTimeOfActivity = getTotalTimeOfActivity(searchDir, filters);
//   console.log(totalTimeOfActivity);
// };

// main(searchDir, filters);

// utils
const getActivityTypes = (searchDir) => {
  const files = Utilities.HelpersFileSystem.getFiles(searchDir);
  const activities = new Set();

  files.forEach((file) => {
    const filePath = path.join(searchDir, file);
    const fileContent =
      Utilities.HelpersFileSystem.getFileContentAsJSON(filePath);
    activities.add(fileContent.fitnessActivity);
  });

  return activities;
};

const getTotalTimeOfActivity = (searchDir, filters) => {
  let totalDurationInSeconds = 0;
  const files = Utilities.HelpersFileSystem.getFiles(searchDir);

  files.forEach((file) => {
    const filePath = path.join(searchDir, file);
    if (isValidActivity(filePath, filters)) {
      totalDurationInSeconds += getActivityDurationInSeconds(filePath);
    }
  });

  return Utilities.HelpersDateTime.convertSecondsToHours(
    totalDurationInSeconds
  );
};

// HELPERS
const isValidActivity = (filePath, filters) =>
  Object.values(filters).every((filter) => filePath.includes(filter));
const getActivityDurationInSeconds = (filePath) => {
  const { duration } = getFileContentAsJSON(filePath);
  return convertStringToNumber(duration);
};
const convertStringToNumber = (durationAsString) =>
  parseInt(durationAsString.slice(0, -1));

module.exports = {
  getActivityTypes,
  getTotalTimeOfActivity,
};
