import dotenv from 'dotenv';
import { ICliConfig } from '../types';
import { IAuthConfig, IConnectorConfig } from '@apiso/core';

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
  return {
    type: 'oauth',
    clientId: process.env.YOUTUBE_CLIENT_ID!,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
    redirectUri: process.env.YOUTUBE_REDIRECT_URI!,
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  };
}

function loadYoutubeConnectorConfig(): IConnectorConfig {
  return {
    type: 'googleapis',
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
