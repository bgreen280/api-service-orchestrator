const { google } = require("googleapis");
const Utilities = require("../utilities/index");

/**
 * Get all playlists for the authenticated user.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @returns {Promise<Array>} A promise that resolves to an array of playlist objects.
 */
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

/**
 * Get items for a given playlist ID.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @param {string} playlistItemsId - The ID of the playlist to retrieve items for.
 * @returns {Promise<Array>} A promise that resolves to an array of playlist items.
 */
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

/**
 * Get all playlist items for the authenticated user.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @param {function|null} callback - An optional callback function to be called with each batch of playlist items.
 * @returns {Promise<Array>} A promise that resolves to an array of all playlist items.
 */
async function getAllPlaylistItems(callback = null) {
  const allPlaylistItems = [];
  try {
    const playlists = await getPlaylists();

    for (const { id } of playlists) {
      try {
        const playlistItems = await getPlaylistItemsById(id);
        if (callback) {
          callback(playlistItems);
        }
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
