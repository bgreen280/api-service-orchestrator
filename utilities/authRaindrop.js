const path = require("path");
const dotenv = require("dotenv");
const { SERVICES } = require("./statics");

// config env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Initialize authentication for the given service.
 * @param {string} service - The name of the service to authenticate.
 * @returns {string} - The access token for the specified service.
 * @throws {Error} - If the access token is not set in the environment variables.
 */
function initAuth(service) {
  if (!service || !SERVICES[service]) {
    throw new Error(`Service "${service}" is not recognized.`);
  }
  const accessToken = process.env[SERVICES[service]];
  if (!accessToken) {
    throw new Error(
      `${SERVICES[service]} RAINDROP_ACCESS_TOKEN is not set in the environment variables`
    );
  }
  return accessToken;
}

const RaindropAuthModule = {
  initAuth,
};

module.exports = { initAuth, RaindropAuthModule };
