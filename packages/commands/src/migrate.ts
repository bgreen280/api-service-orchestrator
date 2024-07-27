import { RaindropClient } from '@apiso/raindrop';
import { YouTubeClient } from '@apiso/youtube';
import { constructRaindropFromYoutubePlaylistItem } from './utils';
import type { IAuthConfig, IConnectorConfig } from '@apiso/core';
import type { ICommandResult } from './types';

export async function migrateYoutubePlaylistItemsToRaindrop(
  youtubeAuthConfig: IAuthConfig,
  youtubeConnectorConfig: IConnectorConfig,
  raindropAuthConfig: IAuthConfig,
  raindropConnectorConfig: IConnectorConfig,
): Promise<ICommandResult> {
  const youtubeClient = new YouTubeClient(
    youtubeAuthConfig,
    youtubeConnectorConfig,
  );
  const raindropClient = new RaindropClient(
    raindropAuthConfig,
    raindropConnectorConfig,
  );

  try {
    const playlists = await youtubeClient.getPlaylists();

    for (const playlist of playlists) {
      const playlistItems = await youtubeClient.getPlaylistItemsById(
        playlist.id!,
      );
      const raindrops = playlistItems.map(playlistItem =>
        constructRaindropFromYoutubePlaylistItem(
          playlist.snippet!.title!,
          playlistItem,
        ),
      );
      await raindropClient.createRaindrops(raindrops);
    }

    return {
      success: true,
      message: 'YouTube playlists successfully migrated to Raindrop.',
    };
  } catch (error) {
    console.error('Failed to migrate YouTube playlists to Raindrop:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
