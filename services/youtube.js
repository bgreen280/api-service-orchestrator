const { google } = require("googleapis");
const Utilities = require("../utilities/index");

// TODO: add support to get X pages and Y results per page (with limit)
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

// add support to get X pages and Y results per page (with limit)
async function getPlaylistItemsById(playlistItemsId) {
  await Utilities.AuthYoutube.initAuth();
  const youtube = google.youtube("v3");

  const contents = [];
  let nextPage;
  do {
    const {
      data: { nextPageToken, items },
    } = await youtube.playlistItems.list({
      part: "snippet,contentDetails",
      auth: Utilities.AuthYoutube.oAuth2Client,
      pageToken: nextPage,
      playlistId: playlistItemsId,
    });
    contents.push(...items);
    nextPage = nextPageToken;
  } while (nextPage);
  return contents;
}

// add support to get X pages and Y results per page (with limit)
async function getAllPlaylistItems(callback = null) {
  const allPlaylistItems = [];
  try {
    const playlists = await getPlaylists().catch(console.error);

    for (const { id } of playlists) {
      try {
        const playlistItems = await getPlaylistItemsById(id).catch(
          console.error
        );
        callback && callback(playlistItems);
        allPlaylistItems.push(...playlistItems);
      } catch (err) {
        console.error(
          `Failed to fetch items for playlist ID ${id}:`,
          err.message
        );
      }
    }
  } catch (error) {
    console.error("Failed to fetch collections:", error.message);
    process.exit(1);
  }
  return allPlaylistItems;
}

module.exports = {
  getPlaylists,
  getPlaylistItemsById,
  getAllPlaylistItems,
};
