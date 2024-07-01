// const Scripts = require("./scripts/index");
const Services = require("./services/index");

async function main() {
  try {
    // Scripts.migrateYoutubePlaylistsToRaindrop();

    return "complete";
  } catch (error) {
    console.error("Failed to fetch collections:", error.message);
    process.exit(1);
  }
}
main();
