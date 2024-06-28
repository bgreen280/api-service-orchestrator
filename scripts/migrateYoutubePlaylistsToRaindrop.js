const Services = require("../services/index");

module.exports = async function migrateYoutubePlaylistsToRaindrop() {
  try {
    const playlists = await Services.Youtube.getPlaylists().catch(
      console.error
    );
    console.log(playlists);
  } catch (error) {
    console.error("Failed to fetch collections:", error.message);
    process.exit(1);
  }
};
