const path = require("path");
const { PORT, TOKENS, SCOPES } = require("./constants");
const {
  getFileContentAsJSON,
  setFile,
  isFilePresent,
} = require("./helpersFileSystem");
const { google } = require("googleapis");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const oAuth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  `http://localhost:${PORT}/oauth2callback`
);

function saveTokens(tokens) {
  setFile(TOKENS, JSON.stringify(tokens));
}

function loadTokens() {
  return (
    isFilePresent(TOKENS) &&
    (oAuth2Client.setCredentials(getFileContentAsJSON(TOKENS)), true)
  );
}

async function authenticate(app) {
  return new Promise(async (resolve, reject) => {
    const open = (await import("open")).default;
    app.get("/oauth2callback", async (req, res) => {
      const { code } = req.query;
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        saveTokens(tokens);
        res.send("Authentication successful! You can close this window.");
        resolve();
        // TODO: shutdown server here
      } catch (error) {
        reject(error);
      }
    });

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      include_granted_scopes: true,
    });
    open(authUrl);
  });
}

module.exports = {
  saveTokens,
  loadTokens,
  authenticate,
  oAuth2Client,
};
