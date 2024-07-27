/**
 * Converts a total duration in seconds to a formatted string in HH:mm:ss.
 *
 * @param totalDuration - The total duration in seconds.
 * @returns The formatted time string in HH:mm:ss.
 * @throws {TypeError} Throws if totalDuration is not a non-negative number.
 */
export const convertSecondsToHours = (totalDuration: number): string => {
  if (typeof totalDuration !== 'number' || totalDuration < 0 || !Number.isFinite(totalDuration)) {
    throw new TypeError('Total duration must be a non-negative finite number');
  }

  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const seconds = Math.floor(totalDuration % 60);

  const pad = (num: number): string => String(num).padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
