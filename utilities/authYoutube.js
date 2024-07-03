const path = require("path");
const express = require("express");
const {
  CONFIG: { PORT },
  CONSTANTS: {
    GOOGLE_CONSTANTS: {
      GOOGLE: { SCOPES, TOKENS_PATH },
    },
  },
} = require("./statics");
const {
  getFileContentAsJSON,
  setFile,
  isFilePresent,
} = require("./helpersFileSystem");
const { google } = require("googleapis");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
let server;

const oAuth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `http://localhost:${PORT}/oauth2callback`
);

function _saveTokens(tokens) {
  setFile(TOKENS_PATH, JSON.stringify(tokens));
}

function _loadTokens() {
  return (
    isFilePresent(GOOGLE_TOKENS) &&
    (oAuth2Client.setCredentials(getFileContentAsJSON(GOOGLE_TOKENS)), true)
  );
}

async function _authenticate() {
  const open = (await import("open")).default;

  return new Promise((resolve, reject) => {
    app.get("/oauth2callback", async (req, res) => {
      const { code } = req.query;
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        _saveTokens(tokens);
        res.send("Authentication successful! You can close this window.");
        resolve();
        server.close(() => {
          console.log("Server closed after authentication.");
        });
      } catch (error) {
        res.status(500).send("Authentication failed");
        console.error("Failed to get token:", error);
        reject(error);
      }
    });

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      include_granted_scopes: true,
    });

    console.log(
      `If the browser does not open automatically, please navigate to the following URL: ${authUrl}`
    );
    open(authUrl).catch(reject);
  });
}

async function initAuth() {
  if (!_loadTokens()) {
    server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    try {
      await _authenticate();
    } catch (error) {
      console.error("Authentication process failed:", error);
    } finally {
      if (server) {
        server.close(() => {
          console.log("Server closed.");
        });
      }
    }
  }
}

module.exports = {
  initAuth,
  oAuth2Client,
};
