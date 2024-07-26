import { createYouTubeAPI, YouTubeAPI } from './api';
import { IPlaylist, IPlaylistItem } from './types';
import { google, IOAuthConfig } from '@apiso/core';

export class YouTubeClient {
  private api: YouTubeAPI;

  constructor(config: IOAuthConfig) {
    this.api = createYouTubeAPI(config);
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    let allPlaylists: IPlaylist[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.api.getPlaylists(nextPageToken);
      allPlaylists = allPlaylists.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    return allPlaylists;
  }

  async getPlaylistItemsById(playlistId: string): Promise<IPlaylistItem[]> {
    let allItems: IPlaylistItem[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.api.getPlaylistItemsById(playlistId, nextPageToken);
      allItems = allItems.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    return allItems;
  }

  async getAllPlaylistItems(callback?: (items: IPlaylistItem[]) => void): Promise<IPlaylistItem[]> {
    const allPlaylistItems: IPlaylistItem[] = [];
    const playlists = await this.getPlaylists();

    for (const playlist of playlists) {
      if (!playlist.id) {
        continue;
      }
      try {
        const playlistItems = await this.getPlaylistItemsById(playlist.id);
        if (callback) {
          callback(playlistItems);
        }
        allPlaylistItems.push(...playlistItems);
      } catch (err) {
        console.error(`Failed to fetch items for playlist ID ${playlist.id}:`, err);
      }
    }

    return allPlaylistItems;
  }
}

export function createYouTubeClient(): YouTubeClient {
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

  const config: IOAuthConfig = {
    type: 'oauth',
    clientId,
    clientSecret,
    oAuth2Client: oauth2Client,
    scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    callbackPort: 3000,
  };

  return new YouTubeClient(config);
}
