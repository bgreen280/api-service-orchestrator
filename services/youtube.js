const { google } = require("googleapis");
const Utilities = require("../utilities/index");

async function getPlaylists() {
  await Utilities.AuthYoutube.initAuth();
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
