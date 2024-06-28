const path = require("path");

const ENDPOINTS = {
  raindrop: {
    collections: () => `https://api.raindrop.io/rest/v1/collections/childrens`,
    collection: (collectionId) =>
      `https://api.raindrop.io/rest/v1/collection/${collectionId}`,
    raindrops: (collectionId) =>
      `https://api.raindrop.io/rest/v1/raindrops/${collectionId}`,
    raindrop: (raindropId) =>
      `https://api.raindrop.io/rest/v1/raindrop/${raindropId}`,
    tags: () => `https://api.raindrop.io/rest/v1/tags`,
  },
  youtube: {
    playlists: () => `https://www.googleapis.com/youtube/v3/playlists`,
  },
};
const PORT = 3000;
const RESOURCES_ID = 45024462;
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
const SERVICES = {
  raindrop: "RAINDROP_ACCESS_TOKEN",
};
const TOKENS = path.resolve(__dirname, "../.data/google/tokens.json");

module.exports = {
  ENDPOINTS,
  PORT,
  RESOURCES_ID,
  SCOPES,
  SERVICES,
  TOKENS,
};
