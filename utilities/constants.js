const path = require("path");

module.exports = {
  ENDPOINTS: {
    raindrop: {
      collections: () =>
        `https://api.raindrop.io/rest/v1/collections/childrens`,
      collection: (id) =>
        `https://api.raindrop.io/rest/v1/collection${id ? `/${id}` : ""}`,
      raindrop: (id) =>
        `https://api.raindrop.io/rest/v1/raindrop${id ? `/${id}` : ""}`,
      raindrops: (id) =>
        `https://api.raindrop.io/rest/v1/raindrops${id ? `/${id}` : ""}`,
      tags: () => `https://api.raindrop.io/rest/v1/tags`,
    },
    youtube: {
      playlists: () => `https://www.googleapis.com/youtube/v3/playlists`,
    },
  },
  GOOGLE_SCOPES: ["https://www.googleapis.com/auth/youtube.readonly"],
  GOOGLE_TOKENS: path.resolve(__dirname, "../.data/google/google-tokens.json"),
  PORT: 3000,
  RAINDROP_RESOURCES_ID: 45024462,
  RAINDROP_TEST_ID: 45024438,
  SERVICES: {
    raindrop: "RAINDROP_ACCESS_TOKEN",
  },
  YOUTUBE_PLAYLIST_ITEM_DATA: path.resolve(
    __dirname,
    "../.data/youtube/playlistItems.json"
  ),
};
