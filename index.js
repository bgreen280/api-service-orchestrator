const Scripts = require("./scripts/index");

// TODO: IIFE?
async function main() {
  try {
    Scripts.migrateYoutubePlaylistsToRaindrop();
  } catch (error) {
    console.error("Failed to fetch collections:", error.message);
    process.exit(1);
  }
}
main();
