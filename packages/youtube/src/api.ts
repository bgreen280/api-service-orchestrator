import { BaseAPI, IOAuthConfig, google, youtube_v3 } from '@apiso/core';
import { IPlaylist, IPlaylistItem, IPaginatedResponse } from './types';

export class YouTubeAPI extends BaseAPI {
  private youtube: youtube_v3.Youtube;

  constructor(config: IOAuthConfig) {
    super({
      auth: config,
      baseUrl: 'https://www.googleapis.com/youtube/v3',
    });
    this.youtube = google.youtube({ version: 'v3', auth: config.oAuth2Client });
  }

  async getPlaylists(pageToken?: string): Promise<IPaginatedResponse<IPlaylist>> {
    const response = await this.youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'localizations', 'status', 'player'],
      mine: true,
      pageToken: pageToken,
    });

    return {
      items: response.data.items || [],
      nextPageToken: response.data.nextPageToken || undefined,
    };
  }

  async getPlaylistItemsById(
    playlistId: string,
    pageToken?: string
  ): Promise<IPaginatedResponse<IPlaylistItem>> {
    const response = await this.youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      playlistId: playlistId,
      pageToken: pageToken,
    });

    return {
      items: response.data.items || [],
      nextPageToken: response.data.nextPageToken || undefined,
    };
  }
}
