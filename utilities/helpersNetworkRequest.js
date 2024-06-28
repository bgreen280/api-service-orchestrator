const axios = require("axios");
const Utilities = require("./index");

async function sendRequest(
  service,
  method,
  endpoint,
  id = null,
  params = null
) {
  try {
    let accessToken = Utilities.AuthRaindrop.getAndValidateAccessToken(service);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    let response;
    if (method === "put") {
      response = await axios[method](
        Utilities.Constants.ENDPOINTS[service][endpoint](id),
        params,
        config
      );
    } else {
      response = await axios[method](
        Utilities.Constants.ENDPOINTS[service][endpoint](id),
        config
      );
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response from server:", error.response.data);
      console.error("Errors:", error.response.data.error.errors);
      console.error("Status code:", error.response.status);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    throw error;
  }
}

module.exports = { sendRequest };
