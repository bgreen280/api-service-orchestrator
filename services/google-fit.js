const path = require("path");
const Utilities = require("../utilities/index");

// Main Functions

/**
 * Retrieves unique fitness activity types from JSON files in a specified directory.
 * @param {string} searchDir - The directory to search for JSON files.
 * @returns {string[]} - An array of unique fitness activity types.
 */
const getActivityTypes = (searchDir) => {
  const files = Utilities.HelpersFileSystem.getFiles(searchDir);
  const activities = new Set();

  files.forEach((file) => {
    const filePath = path.join(searchDir, file);
    try {
      const fileContent =
        Utilities.HelpersFileSystem.getFileContentAsJSON(filePath);
      if (fileContent && fileContent.fitnessActivity) {
        activities.add(fileContent.fitnessActivity);
      }
    } catch (error) {
      console.error(`Error reading or parsing file: ${filePath}`, error);
    }
  });

  return Array.from(activities); // Convert Set to Array for consistency
};

/**
 * Calculates the total time of activities based on filters in a specified directory.
 * @param {string} searchDir - The directory to search for JSON files.
 * @param {Object} filters - The filters to apply to activity files.
 * @returns {number} - The total duration of activities in hours.
 */
const getTotalTimeOfActivity = (searchDir, filters) => {
  let totalDurationInSeconds = 0;
  const files = Utilities.HelpersFileSystem.getFiles(searchDir);

  files.forEach((file) => {
    const filePath = path.join(searchDir, file);
    if (isValidActivity(filePath, filters)) {
      try {
        totalDurationInSeconds += getActivityDurationInSeconds(filePath);
      } catch (error) {
        console.error(`Error processing file: ${filePath}`, error);
      }
    }
  });

  return Utilities.HelpersDateTime.convertSecondsToHours(
    totalDurationInSeconds
  );
};

// Helper Functions

/**
 * Checks if a file path is a valid activity based on the provided filters.
 * @param {string} filePath - The path of the file to check.
 * @param {Object} filters - The filters to apply to the file.
 * @returns {boolean} - True if the file is a valid activity, false otherwise.
 */
const isValidActivity = (filePath, filters) =>
  Object.values(filters).every((filter) => filePath.includes(filter));

/**
 * Retrieves the duration of an activity in seconds from a JSON file.
 * @param {string} filePath - The path of the JSON file.
 * @returns {number} - The duration of the activity in seconds.
 */
const getActivityDurationInSeconds = (filePath) => {
  const { duration } =
    Utilities.HelpersFileSystem.getFileContentAsJSON(filePath);
  return convertStringToNumber(duration);
};

/**
 * Converts a duration string to a number of seconds.
 * @param {string} durationAsString - The duration string to convert (e.g., '3600s').
 * @returns {number} - The duration in seconds.
 */
const convertStringToNumber = (durationAsString) =>
  parseInt(durationAsString.slice(0, -1), 10);

// Module Exports

const GoogleFitModule = {
  getActivityTypes,
  getTotalTimeOfActivity,
};

module.exports = {
  getActivityTypes: GoogleFitModule.getActivityTypes,
  getTotalTimeOfActivity: GoogleFitModule.getTotalTimeOfActivity,
  GoogleFitModule,
};
