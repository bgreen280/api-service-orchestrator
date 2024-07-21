import path from 'path';
import * as Utilities from '../utilities/index';

interface Filters {
  [key: string]: string;
}

interface ActivityFile {
  fitnessActivity?: string;
  duration: string;
}

// Main Functions

/**
 * Retrieves unique fitness activity types from JSON files in a specified directory.
 * @param searchDir - The directory to search for JSON files.
 * @returns An array of unique fitness activity types.
 */
const getActivityTypes = (searchDir: string): string[] => {
  const files = Utilities.HelpersFileSystem.getFiles(searchDir);
  const activities = new Set<string>();

  files.forEach((file) => {
    const filePath = path.join(searchDir, file);
    try {
      const fileContent = Utilities.HelpersFileSystem.getFileContentAsJSON(filePath) as ActivityFile;
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
 * @param searchDir - The directory to search for JSON files.
 * @param filters - The filters to apply to activity files.
 * @returns The total duration of activities in hours.
 */
const getTotalTimeOfActivity = (searchDir: string, filters: Filters): string => {
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

  return Utilities.HelpersDateTime.convertSecondsToHours(totalDurationInSeconds);
};

// Helper Functions

/**
 * Checks if a file path is a valid activity based on the provided filters.
 * @param filePath - The path of the file to check.
 * @param filters - The filters to apply to the file.
 * @returns True if the file is a valid activity, false otherwise.
 */
const isValidActivity = (filePath: string, filters: Filters): boolean =>
  Object.values(filters).every((filter) => filePath.includes(filter));

/**
 * Retrieves the duration of an activity in seconds from a JSON file.
 * @param filePath - The path of the JSON file.
 * @returns The duration of the activity in seconds.
 */
const getActivityDurationInSeconds = (filePath: string): number => {
  const { duration } = Utilities.HelpersFileSystem.getFileContentAsJSON(filePath) as ActivityFile;
  return convertStringToNumber(duration);
};

/**
 * Converts a duration string to a number of seconds.
 * @param durationAsString - The duration string to convert (e.g., '3600s').
 * @returns The duration in seconds.
 */
const convertStringToNumber = (durationAsString: string): number =>
  parseInt(durationAsString.slice(0, -1), 10);

// Module Exports

const GoogleFitModule = {
  getActivityTypes,
  getTotalTimeOfActivity,
};

export {
  getActivityTypes,
  getTotalTimeOfActivity,
  GoogleFitModule,
};