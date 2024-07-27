import fs from 'fs';
import { FileReadOptions } from './types';

/**
 * Read the contents of a file synchronously.
 * @param filePath - Path to the file.
 * @returns The file content.
 * @throws Error if the file cannot be read.
 */
export const getFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Error reading file at ${filePath}: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Read the contents of a file and parse it as JSON.
 * @param filePath - Path to the file.
 * @param options - Options for reading the file.
 * @returns The parsed JSON content.
 * @throws Error if the file cannot be read or parsed.
 */
export const getFileContentAsJSON = (
  filePath: string,
  options: FileReadOptions = { encoding: 'utf8' }
): unknown => {
  try {
    const content = fs.readFileSync(filePath, options);
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error parsing JSON from file at ${filePath}: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Get a list of files in a directory synchronously.
 * @param searchDir - Directory to search.
 * @returns List of file names.
 * @throws Error if the directory cannot be read.
 */
export const getFiles = (searchDir: string): string[] => {
  try {
    return fs.readdirSync(searchDir);
  } catch (error) {
    console.error(`Error reading directory at ${searchDir}: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Check if a file is present at the specified path.
 * @param filePath - Path to the file.
 * @returns True if the file exists, false otherwise.
 * @throws Error if the file presence cannot be checked.
 */
export const isFilePresent = (filePath: string): boolean => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(`Error checking presence of file at ${filePath}: ${(error as Error).message}`);
    throw error;
  }
};

/**
 * Write content to a file synchronously.
 * @param name - Name of the file.
 * @param content - Content to write to the file.
 * @throws Error if the file cannot be written.
 */
export const setFile = (name: string, content: string | Buffer): void => {
  try {
    fs.writeFileSync(name, content);
  } catch (error) {
    console.error(`Error writing to file ${name}: ${(error as Error).message}`);
    throw error;
  }
};
