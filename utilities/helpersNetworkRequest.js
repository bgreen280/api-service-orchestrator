const axios = require("axios");
const { initAuth } = require("./authRaindrop");
const { ENDPOINTS } = require("./statics");

async function sendRequest(
  service,
  method,
  endpoint,
  id = null,
  params = null
) {
  try {
    let accessToken = initAuth(service);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    let response;
    if (method === "put" || method === "post") {
      response = await axios[method](
        ENDPOINTS[service][endpoint](id),
        params,
        config
      );
    } else {
      response = await axios[method](ENDPOINTS[service][endpoint](id), config);
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
