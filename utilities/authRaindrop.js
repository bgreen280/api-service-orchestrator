const path = require("path");
const { SERVICES } = require("./statics");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

function initAuth(service) {
  const accessToken = process.env[SERVICES[service]];
  if (!accessToken) {
    throw new Error(
      `${SERVICES[service]} RAINDROP_ACCESS_TOKEN is not set in the environment variables`
    );
  }
  return accessToken;
}

module.exports = { initAuth };
