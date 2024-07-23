import { YouTubeClient } from './client';
import { Playlist, PlaylistItem } from './types';
import { OAuthConfig } from '@apiso/core';

export class YouTubeAPI {
  private client: YouTubeClient;

  constructor(config: OAuthConfig) {
    this.client = new YouTubeClient(config);
  }

  async getPlaylists(): Promise<Playlist[]> {
    let allPlaylists: Playlist[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.client.getPlaylists(nextPageToken);
      allPlaylists = allPlaylists.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    return allPlaylists;
  }

  async getPlaylistItemsById(playlistId: string): Promise<PlaylistItem[]> {
    let allItems: PlaylistItem[] = [];
    let nextPageToken: string | undefined;

    do {
      const response = await this.client.getPlaylistItemsById(playlistId, nextPageToken);
      allItems = allItems.concat(response.items);
      nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    return allItems;
  }

  async getAllPlaylistItems(callback?: (items: PlaylistItem[]) => void): Promise<PlaylistItem[]> {
    const allPlaylistItems: PlaylistItem[] = [];
    const playlists = await this.getPlaylists();

    for (const playlist of playlists) {
      if (!playlist.id) continue;
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