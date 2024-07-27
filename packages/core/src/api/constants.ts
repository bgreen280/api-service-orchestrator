import path from 'path';

export const GOOGLE_CONSTANTS = {
  SCOPES: ['https://www.googleapis.com/auth/youtube.readonly'],
  TOKENS_PATH: path.resolve(process.cwd(), '.data/google/google-tokens.json'),
};

export const RAINDROP_CONSTANTS = {
  RAINDROP_RESOURCES_ID: '45024462',
  RAINDROP_TEST_ID: '45024438',
};

export const YOUTUBE_CONSTANTS = {
  PLAYLIST_ITEM_DATA_PATH: path.resolve(process.cwd(), '.data/youtube/playlistItems.json'),
};
