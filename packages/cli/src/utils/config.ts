import dotenv from 'dotenv';
import { ICliConfig } from '../types';
import { google } from '@apiso/core';
import type { IAuthConfig, IConnectorConfig } from '@apiso/core';

dotenv.config();

export async function loadConfig(): Promise<ICliConfig> {
  return {
    youtube: {
      auth: loadYoutubeAuthConfig(),
      connector: loadYoutubeConnectorConfig(),
    },
    raindrop: {
      auth: loadRaindropAuthConfig(),
      connector: loadRaindropConnectorConfig(),
    },
  };
}

function loadYoutubeAuthConfig(): IAuthConfig {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID!,
    process.env.YOUTUBE_CLIENT_SECRET!,
    process.env.YOUTUBE_REDIRECT_URI!
  );

  return {
    type: 'oauth',
    clientId: process.env.YOUTUBE_CLIENT_ID!,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
    redirectUri: process.env.YOUTUBE_REDIRECT_URI!,
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    oAuth2Client: oauth2Client,
    callbackPort: 3000, // You may want to make this configurable
  };
}

function loadYoutubeConnectorConfig(): IConnectorConfig {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID!,
    process.env.YOUTUBE_CLIENT_SECRET!,
    process.env.YOUTUBE_REDIRECT_URI!
  );
  return {
    type: 'googleapis',
    auth: oauth2Client,
  };
}

function loadRaindropAuthConfig(): IAuthConfig {
  return {
    type: 'apiKey',
    apiKey: process.env.RAINDROP_API_KEY!,
  };
}

function loadRaindropConnectorConfig(): IConnectorConfig {
  return {
    type: 'axios',
    baseURL: 'https://api.raindrop.io/rest/v1',
  };
}
