// commands/dev.ts
import { migrateYoutubePlaylistItemsToRaindrop } from '@apiso/commands';
import { google } from '@apiso/core';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID!,
  process.env.YOUTUBE_CLIENT_SECRET!,
  process.env.YOUTUBE_REDIRECT_URI!
);

const youtubeAuthConfig = {
  type: 'oauth' as const,
  clientId: process.env.YOUTUBE_CLIENT_ID!,
  clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
  oAuth2Client: oauth2Client,
  callbackPort: 3000,
  scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  redirectUri: process.env.YOUTUBE_REDIRECT_URI!, // Add this line
};

const youtubeConnectorConfig = {
  type: 'googleapis' as const,
  auth: oauth2Client,
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
