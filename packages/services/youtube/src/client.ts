import { YouTubeAPI } from './api';
import type { IAuthConfig, IConnectorConfig } from '@apiso/core';
import type { IPlaylist, IPlaylistItem } from './types';

export class YouTubeClient {
  private api: YouTubeAPI;

  constructor(authConfig: IAuthConfig, connectorConfig: IConnectorConfig) {
    this.api = new YouTubeAPI(authConfig, connectorConfig);
  }

  async getPlaylists(): Promise<IPlaylist[]> {
    let allPlaylists: IPlaylist[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.api.getPlaylists(nextPageToken);
      allPlaylists = allPlaylists.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken ?? '');

    return allPlaylists;
  }

  async getPlaylistItemsById(playlistId: string): Promise<IPlaylistItem[]> {
    let allItems: IPlaylistItem[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.api.getPlaylistItemsById(
        playlistId,
        nextPageToken,
      );
      allItems = allItems.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken ?? '');

    return allItems;
  }

  async getAllPlaylistItems(
    callback?: (items: IPlaylistItem[]) => void,
  ): Promise<IPlaylistItem[]> {
    const allPlaylistItems: IPlaylistItem[] = [];
    const playlists = await this.getPlaylists();

    for (const playlist of playlists) {
      if (!(playlist.id ?? '')) {
        continue;
      }
      try {
        const playlistItems = await this.getPlaylistItemsById(playlist.id);
        if (callback) {
          callback(playlistItems);
        }
        allPlaylistItems.push(...playlistItems);
      } catch (err) {
        console.error(
          `Failed to fetch items for playlist ID ${playlist.id}:`,
          err,
        );
      }
    }

    return allPlaylistItems;
  }
}
