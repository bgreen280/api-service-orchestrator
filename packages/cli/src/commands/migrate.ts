import { constructRaindropFromYoutubePlaylistItem } from '@apiso/raindrop';
import { Playlist, PlaylistItem,  } from '@apiso/youtube';
import { CommandResult } from '../types';
import { createYouTubeAPI, createRaindropAPI } from '../utils';

export async function migrateYoutubePlaylistItemsToRaindrop(): Promise<CommandResult> {
  const youtubeAPI = createYouTubeAPI();
  const raindropAPI = createRaindropAPI();

  try {
    const playlists: Playlist[] = await youtubeAPI.getPlaylists();

    for (const playlist of playlists) {
      const playlistItems: PlaylistItem[] = await youtubeAPI.getPlaylistItemsById(playlist.id!);
      const raindrops = playlistItems.map((playlistItem) =>
        constructRaindropFromYoutubePlaylistItem(
          playlist.snippet!.title!,
          playlistItem
        )
      );
      await raindropAPI.createRaindrops(raindrops);
    }

    return {
      success: true,
      message: "YouTube playlists successfully migrated to Raindrop."
    };
  } catch (error) {
    console.error("Failed to migrate YouTube playlists to Raindrop:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error)
    };
  }
}