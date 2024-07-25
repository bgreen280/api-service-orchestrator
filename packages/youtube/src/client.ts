import { BaseClient, OAuthConfig, google, youtube_v3 } from '@apiso/core';
import { Playlist, PlaylistItem, PaginatedResponse } from './types';

export class YouTubeClient extends BaseClient {
  private youtube: youtube_v3.Youtube;

  constructor(config: OAuthConfig) {
    super({
      auth: config,
      baseUrl: 'https://www.googleapis.com/youtube/v3',
    });
    this.youtube = google.youtube({ version: 'v3', auth: config.oAuth2Client });
  }

  async getPlaylists(pageToken?: string): Promise<PaginatedResponse<Playlist>> {
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
  ): Promise<PaginatedResponse<PlaylistItem>> {
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
