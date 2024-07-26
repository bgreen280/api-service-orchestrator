import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function for resolving paths relative to the workspace root
const workspaceRoot = path.resolve(__dirname, '..', '..');

export function workspacePath(relativePath: string): string {
  return path.resolve(workspaceRoot, relativePath);
}

// CONFIG & SERVICES
const SERVICES = {
  raindrop: 'RAINDROP_ACCESS_TOKEN',
} as const;

// ENDPOINTS
const RAINDROP_ENDPOINTS = {
  collections: (): string => `https://api.raindrop.io/rest/v1/collections/childrens`,
  collection: (id?: number): string =>
    `https://api.raindrop.io/rest/v1/collection${id ? `/${id}` : ''}`,
  raindrop: (id?: number): string =>
    `https://api.raindrop.io/rest/v1/raindrop${id ? `/${id}` : ''}`,
  raindrops: (id?: number): string =>
    `https://api.raindrop.io/rest/v1/raindrops${id ? `/${id}` : ''}`,
  tags: (): string => `https://api.raindrop.io/rest/v1/tags`,
} as const;

const YOUTUBE_ENDPOINTS = {
  playlists: (): string => `https://www.googleapis.com/youtube/v3/playlists`,
} as const;

// CONSTANTS
const GOOGLE_CONSTANTS = {
  SCOPES: ['https://www.googleapis.com/auth/youtube.readonly'] as const,
  TOKENS_PATH: workspacePath('.data/google/google-tokens.json'),
};

const GOOGLE_FIT_CONSTANTS = {
  DATA_PATH: workspacePath('data/googleFit'),
  SEARCH_FILTERS: {
    year: '2023',
    activity: 'MEDITATION',
  },
};

const GOOGLE_FI_CONSTANTS = {
  DATA_PATH: workspacePath('data/googleFi/callData.csv'),
  SEARCH_FILTERS: {
    number: '(239) 821-3609',
  },
};

const RAINDROP_CONSTANTS = {
  RAINDROP_RESOURCES_ID: "45024462",
  RAINDROP_TEST_ID: "45024438",
};

const YOUTUBE_CONSTANTS = {
  PLAYLIST_ITEM_DATA_PATH: workspacePath('data/youtube/playlistItems.json'),
};

export {
  SERVICES,
  GOOGLE_CONSTANTS as GOOGLE,
  GOOGLE_FI_CONSTANTS as GOOGLE_FI,
  GOOGLE_FIT_CONSTANTS as GOOGLE_FIT,
  RAINDROP_CONSTANTS,
  YOUTUBE_CONSTANTS as YOUTUBE,
  RAINDROP_ENDPOINTS as RAINDROP_ENDPOINTS,
  YOUTUBE_ENDPOINTS as YOUTUBE_ENDPOINTS,
};