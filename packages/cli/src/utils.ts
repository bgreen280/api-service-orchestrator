import { YouTubeAPI } from '@apiso/youtube';
import { RaindropAPI } from '@apiso/raindrop';
import { OAuthConfig, google } from '@apiso/core';

export function createYouTubeAPI(): YouTubeAPI {
  const clientId = process.env.YOUTUBE_CLIENT_ID;
  const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
  const redirectUri = process.env.YOUTUBE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error('Missing YouTube OAuth credentials in environment variables');
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  // You need to implement token retrieval/refresh logic here
  oauth2Client.setCredentials({
    access_token: process.env.YOUTUBE_ACCESS_TOKEN,
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
  });

  const config: OAuthConfig = {
    type: 'oauth',
    clientId,
    clientSecret,
    oAuth2Client: oauth2Client,
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    callbackPort: 3000, // Add this if it's required by your OAuthConfig type
  };

  return new YouTubeAPI(config);
}

export function createRaindropAPI(): RaindropAPI {
  const apiKey = process.env.RAINDROP_API_KEY;
  if (!apiKey) {
    throw new Error('RAINDROP_API_KEY is not set in the environment variables');
  }
  return new RaindropAPI(apiKey);
}
