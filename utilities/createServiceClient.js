const axios = require("axios");
const { initAuth } = require("./authRaindrop");
const { ENDPOINTS } = require("./statics");

/**
 * Factory function to create a service client.
 *
 * @param {string} service - The name of the service.
 * @returns {Object} - An object containing the methods for the service.
 */
function createServiceClient(service) {
  const accessToken = initAuth(service);
  const config = _createConfig(accessToken);

  /**
   * Send a request to the specified endpoint of the service.
   *
   * @param {string} method - The HTTP method (get, post, put, delete).
   * @param {string} endpoint - The endpoint to send the request to.
   * @param {string|null} [id=null] - The ID for the endpoint, if applicable.
   * @param {Object|null} [params=null] - The parameters to include in the request body, if applicable.
   * @returns {Promise<Object>} - The response data from the request.
   */
  async function sendRequest(method, endpoint, id = null, params = null) {
    try {
      const url = _createUrl(service, endpoint, id);
      const response =
        method === "put" || method === "post"
          ? await axios[method](url, params, config)
          : await axios[method](url, config);

      return response.data;
    } catch (error) {
      _handleRequestError(error);
      throw error;
    }
  }

  return {
    sendRequest,
  };
}

/**
 * Create the configuration object for the axios request.
 *
 * @param {string} accessToken - The access token for authorization.
 * @returns {Object} - The configuration object for axios.
 */
function _createConfig(accessToken) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
}

/**
 * Create the URL for the axios request.
 *
 * @param {string} service - The name of the service.
 * @param {string} endpoint - The endpoint to send the request to.
 * @param {string|null} [id=null] - The ID for the endpoint, if applicable.
 * @returns {string} - The complete URL for the request.
 */
function _createUrl(service, endpoint, id) {
  return ENDPOINTS[service][endpoint](id);
}

/**
 * Handle errors that occur during an axios request.
 *
 * @param {Object} error - The error object from the request.
 */
function _handleRequestError(error) {
  if (error.response) {
    console.error("Error response from server:", error.response.data);
    console.error("Errors:", error.response.data.error.errors);
    console.error("Status code:", error.response.status);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up the request:", error.message);
  }
}

module.exports = { createServiceClient };
