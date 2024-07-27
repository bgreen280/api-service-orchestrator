import { BaseAPI } from '@apiso/core';
import type { IAuthConfig, IConnectorConfig } from '@apiso/core';
import type { IPlaylist, IPlaylistItem, IPaginatedResponse } from './types';

export class YouTubeAPI extends BaseAPI {
  constructor(authConfig: IAuthConfig, connectorConfig: IConnectorConfig) {
    super(authConfig, connectorConfig);
  }

  async getPlaylists(pageToken?: string): Promise<IPaginatedResponse<IPlaylist>> {
    return this.request<IPaginatedResponse<IPlaylist>>('GET', '/playlists', {
      part: ['snippet', 'contentDetails', 'localizations', 'status', 'player'],
      mine: true,
      pageToken: pageToken,
    });
  }

  async getPlaylistItemsById(
    playlistId: string,
    pageToken?: string
  ): Promise<IPaginatedResponse<IPlaylistItem>> {
    return this.request<IPaginatedResponse<IPlaylistItem>>('GET', '/playlistItems', {
      part: ['snippet', 'contentDetails'],
      playlistId: playlistId,
      pageToken: pageToken,
    });
  }
}
