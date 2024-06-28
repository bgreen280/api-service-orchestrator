const fs = require("fs");

const getFile = (filePath) => fs.readFileSync(filePath, { encoding: "utf8" });
const getFileContentAsJSON = (filePath, options = { encoding: "utf8" }) =>
  JSON.parse(fs.readFileSync(filePath, options));
const getFiles = (searchDir) => fs.readdirSync(searchDir);
const isFilePresent = (filePath) => fs.existsSync(filePath);
const setFile = (name, content) => fs.writeFileSync(name, content);

module.exports = {
  getFile,
  getFileContentAsJSON,
  getFiles,
  isFilePresent,
  setFile,
};
