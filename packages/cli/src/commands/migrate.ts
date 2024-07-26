import { createRaindropClient } from '@apiso/raindrop';
import { createYoutubeClient, IPlaylist, IPlaylistItem } from '@apiso/youtube';
import { ICommandResult } from '../types';


export async function migrateYoutubePlaylistItemsToRaindrop(): Promise<ICommandResult> {
  const youtubeClient = createYoutubeClient();
  const raindropClient = createRaindropClient();

  try {
    const playlists: IPlaylist[] = await youtubeClient.getPlaylists();

    for (const playlist of playlists) {
      const playlistItems: IPlaylistItem[] = await youtubeClient.getPlaylistItemsById(playlist.id!);
      const raindrops = playlistItems.map(playlistItem =>
        constructRaindropFromYoutubePlaylistItem(playlist.snippet!.title!, playlistItem)
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
