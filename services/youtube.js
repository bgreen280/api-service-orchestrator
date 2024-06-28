const express = require("express");
const { google } = require("googleapis");
const Utilities = require("../utilities/index");

const app = express();

async function getPlaylists() {
  if (!Utilities.AuthYoutube.loadTokens()) {
    await new Promise((resolve) => {
      app.listen(Utilities.Constants.PORT, () => {
        console.log(
          `Server is running on http://localhost:${Utilities.Constants.PORT}`
        );
        console.log(
          "If the browser does not open automatically, please navigate to the above URL."
        );
        resolve();
      });
    });
    await Utilities.AuthYoutube.authenticate(app);
  }

  const youtube = google.youtube("v3");

  const playlists = [];
  let nextPage;
  do {
    const {
      data: { items, nextPageToken },
    } = await youtube.playlists.list({
      part: "snippet,contentDetails,localizations,status,player",
      mine: true,
      auth: Utilities.AuthYoutube.oAuth2Client,
      pageToken: nextPage,
    });
    playlists.push(...items);
    nextPage = nextPageToken;
  } while (nextPage);

  return playlists;
}

module.exports = {
  getPlaylists,
};
