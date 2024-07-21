import * as Services from "../services/index";

interface Playlist {
  id: string;
  snippet: {
    title: string,
  };
}

interface PlaylistItem {
  // Define the structure of a playlist item based on your YouTube API response
  // This is a placeholder and should be replaced with the actual structure
  id: string;
  snippet: {
    title: string,
    description: string,
    resourceId: {
      videoId: string,
    },
  };
}

// supports playlists of where n < 100
async function migrateYoutubePlaylistItemsToRaindrop(): Promise<string> {
  try {
    const playlists: Playlist[] = await Services.Youtube.getPlaylists();

    for (const playlist of playlists) {
      const playlistItems: PlaylistItem[] =
        await Services.Youtube.getPlaylistItemsById(playlist.id);
      await Services.Raindrop.createRaindrops(
        playlistItems.map((playlistItem) =>
          Services.Raindrop.constructRaindropFromYoutubePlaylistItem(
            playlist.snippet.title,
            playlistItem
          )
        )
      );
    }
    return "complete";
  } catch (error) {
    console.error(
      "Failed to fetch collections:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

export default migrateYoutubePlaylistItemsToRaindrop;
