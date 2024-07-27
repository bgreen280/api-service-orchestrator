// commands/dev.ts
import { migrateYoutubePlaylistItemsToRaindrop } from './migrateYoutubePlaylistItemsToRaindrop';
import dotenv from 'dotenv';

dotenv.config();

const youtubeAuthConfig = {
  type: 'oauth' as const,
  clientId: process.env.YOUTUBE_CLIENT_ID!,
  clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
  redirectUri: process.env.YOUTUBE_REDIRECT_URI!,
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
};

const youtubeConnectorConfig = {
  type: 'googleapis' as const,
};

const raindropAuthConfig = {
  type: 'apiKey' as const,
  apiKey: process.env.RAINDROP_API_KEY!,
};

const raindropConnectorConfig = {
  type: 'axios' as const,
  baseURL: 'https://api.raindrop.io/rest/v1',
};

async function main() {
  try {
    const result = await migrateYoutubePlaylistItemsToRaindrop(
      youtubeAuthConfig,
      youtubeConnectorConfig,
      raindropAuthConfig,
      raindropConnectorConfig
    );
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
