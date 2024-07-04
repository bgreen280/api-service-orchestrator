const fs = require("fs");

/**
 * Read the contents of a file synchronously.
 * @param {string} filePath - Path to the file.
 * @returns {string} The file content.
 */
const getFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, { encoding: "utf8" });
  } catch (error) {
    console.error(`Error reading file at ${filePath}: ${error.message}`);
    throw error;
  }
};

/**
 * Read the contents of a file and parse it as JSON.
 * @param {string} filePath - Path to the file.
 * @param {object} [options={ encoding: "utf8" }] - Options for reading the file.
 * @returns {object} The parsed JSON content.
 */
const getFileContentAsJSON = (filePath, options = { encoding: "utf8" }) => {
  try {
    const content = fs.readFileSync(filePath, options);
    return JSON.parse(content);
  } catch (error) {
    console.error(
      `Error parsing JSON from file at ${filePath}: ${error.message}`
    );
    throw error;
  }
};

/**
 * Get a list of files in a directory synchronously.
 * @param {string} searchDir - Directory to search.
 * @returns {string[]} List of file names.
 */
const getFiles = (searchDir) => {
  try {
    return fs.readdirSync(searchDir);
  } catch (error) {
    console.error(`Error reading directory at ${searchDir}: ${error.message}`);
    throw error;
  }
};

/**
 * Check if a file is present at the specified path.
 * @param {string} filePath - Path to the file.
 * @returns {boolean} True if the file exists, false otherwise.
 */
const isFilePresent = (filePath) => {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    console.error(
      `Error checking presence of file at ${filePath}: ${error.message}`
    );
    throw error;
  }
};

/**
 * Write content to a file synchronously.
 * @param {string} name - Name of the file.
 * @param {string|Buffer} content - Content to write to the file.
 */
const setFile = (name, content) => {
  try {
    fs.writeFileSync(name, content);
  } catch (error) {
    console.error(`Error writing to file ${name}: ${error.message}`);
    throw error;
  }
};

const FileUtils = {
  getFile,
  getFileContentAsJSON,
  getFiles,
  isFilePresent,
  setFile,
};

module.exports = {
  getFile: FileUtils.getFile,
  getFileContentAsJSON: FileUtils.getFileContentAsJSON,
  getFiles: FileUtils.getFiles,
  isFilePresent: FileUtils.isFilePresent,
  setFile: FileUtils.setFile,
  FileUtils,
};
