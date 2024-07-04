const path = require("path");

// CONFIG & SERVICES
const CONFIG = {
  PORT: 3000,
};

const SERVICES = {
  raindrop: "RAINDROP_ACCESS_TOKEN",
};

// ENDPOINTS
const RaindropEndpoints = {
  collections: () => `https://api.raindrop.io/rest/v1/collections/childrens`,
  collection: (id) =>
    `https://api.raindrop.io/rest/v1/collection${id ? `/${id}` : ""}`,
  raindrop: (id) =>
    `https://api.raindrop.io/rest/v1/raindrop${id ? `/${id}` : ""}`,
  raindrops: (id) =>
    `https://api.raindrop.io/rest/v1/raindrops${id ? `/${id}` : ""}`,
  tags: () => `https://api.raindrop.io/rest/v1/tags`,
};

const YouTubeEndpoints = {
  playlists: () => `https://www.googleapis.com/youtube/v3/playlists`,
};

// CONSTANTS
const GOOGLE_CONSTANTS = {
  SCOPES: ["https://www.googleapis.com/auth/youtube.readonly"],
  TOKENS_PATH: path.resolve(__dirname, "../.data/google/google-tokens.json"),
};

const GOOGLE_FIT_CONSTANTS = {
  DATA_PATH: path.join(__dirname, "/data/googleFit"),
  SEARCH_FILTERS: {
    year: "2023",
    activity: "MEDITATION",
  },
};
const GOOGLE_FI_CONSTANTS = {
  DATA_PATH: path.join(__dirname, "/data/googleFi/callData.csv"),
  SEARCH_FILTERS: {
    number: "(239) 821-3609",
  },
};

const RAINDROP_CONSTANTS = {
  RAINDROP_RESOURCES_ID: 45024462,
  RAINDROP_TEST_ID: 45024438,
};

const YOUTUBE_CONSTANTS = {
  PLAYLIST_ITEM_DATA_PATH: path.resolve(
    __dirname,
    "../.data/youtube/playlistItems.json"
  ),
};

module.exports = {
  CONFIG,
  SERVICES,
  CONSTANTS: {
    GOOGLE: GOOGLE_CONSTANTS,
    GOOGLE_FI: GOOGLE_FI_CONSTANTS,
    GOOGLE_FIT: GOOGLE_FIT_CONSTANTS,
    RAINDROP: RAINDROP_CONSTANTS,
    YOUTUBE: YOUTUBE_CONSTANTS,
  },
  ENDPOINTS: {
    RAINDROP: RaindropEndpoints,
    YOUTUBE: YouTubeEndpoints,
  },
};
