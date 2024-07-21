import csvToJson from 'csvtojson';
import * as Utilities from '../utilities/index';

// Constants
const GOOGLE_FI_NUMBER =
  Utilities.Statics.CONSTANTS.GOOGLE_FI.SEARCH_FILTERS.number;

interface CallEntry {
  Phone: string;
  Duration: string;
}

/**
 * Calculate the total time spent on call with a specific person from a CSV file.
 * The duration in the CSV file should be in the format of "hours:minutes:seconds".
 *
 * @param filePath - The path to the CSV file containing call data.
 * @returns The total time on call in the format "HH:mm:ss".
 * @throws Will throw an error if the file cannot be read or parsed.
 */
const getTotalTimeOnCallWithPerson = async (filePath: string): Promise<string> => {
  try {
    const data: CallEntry[] = await csvToJson().fromFile(filePath);
    let totalSeconds = 0;

    for (const entry of data) {
      if (entry.Phone === GOOGLE_FI_NUMBER && entry.Duration !== "") {
        const [hours, minutes, seconds] = entry.Duration.split(":").map(Number);
        totalSeconds +=
          (seconds || 0) + (minutes || 0) * 60 + (hours || 0) * 3600;
      }
    }

    return Utilities.HelpersDateTime.convertSecondsToHours(totalSeconds);
  } catch (error) {
    throw new Error(
      `Failed to process the file at ${filePath}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

// Module exports
const GoogleFiModule = {
  getTotalTimeOnCallWithPerson,
};

export {
  getTotalTimeOnCallWithPerson,
  GoogleFiModule,
};