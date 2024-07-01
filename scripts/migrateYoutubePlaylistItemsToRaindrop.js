const Services = require("../services/index");

// supports playlists of where n < 100
module.exports = async function migrateYoutubePlaylistItemsToRaindrop() {
  try {
    const playlists = await Services.Youtube.getPlaylists();

    for (const playlist of playlists) {
      const playlistItems = await Services.Youtube.getPlaylistItemsById(
        playlist.id
      );
      await Services.Raindrop.createRaindrops({
        items: playlistItems.map((playlistItem) =>
          Services.Raindrop.constructRaindropFromYoutubePlaylistItem(
            playlist.snippet.title,
            playlistItem
          )
        ),
      });
    }
    return "complete";
  } catch (error) {
    console.error("Failed to fetch collections:", error.message);
    process.exit(1);
  }
};
