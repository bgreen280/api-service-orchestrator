import { google, youtube_v3 } from 'googleapis';
import * as Utilities from '../utilities/index';

/**
 * Get all playlists for the authenticated user.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @returns A promise that resolves to an array of playlist objects.
 */
async function getPlaylists(): Promise<youtube_v3.Schema$Playlist[]> {
  await Utilities.AuthYoutube.initAuth();
  const youtube = google.youtube('v3');

  const playlists: youtube_v3.Schema$Playlist[] = [];
  let nextPage: string | undefined;
  do {
    const response = await youtube.playlists.list({
      part: ['snippet', 'contentDetails', 'localizations', 'status', 'player'],
      mine: true,
      auth: Utilities.AuthYoutube.oAuth2Client,
      pageToken: nextPage,
    });

    const { items, nextPageToken } = response.data;
    if (items) playlists.push(...items);
    nextPage = nextPageToken ?? undefined;
  } while (nextPage);

  return playlists;
}

/**
 * Get items for a given playlist ID.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @param playlistItemsId - The ID of the playlist to retrieve items for.
 * @returns A promise that resolves to an array of playlist items.
 */
async function getPlaylistItemsById(playlistItemsId: string): Promise<youtube_v3.Schema$PlaylistItem[]> {
  await Utilities.AuthYoutube.initAuth();
  const youtube = google.youtube('v3');

  const contents: youtube_v3.Schema$PlaylistItem[] = [];
  let nextPage: string | undefined;
  do {
    const response = await youtube.playlistItems.list({
      part: ['snippet', 'contentDetails'],
      auth: Utilities.AuthYoutube.oAuth2Client,
      pageToken: nextPage,
      playlistId: playlistItemsId,
    });

    const { items, nextPageToken } = response.data;
    if (items) contents.push(...items);
    nextPage = nextPageToken ?? undefined;
  } while (nextPage);
  return contents;
}

/**
 * Get all playlist items for the authenticated user.
 * TODO: add support to get X pages and Y results per page (with limit)
 * @param callback - An optional callback function to be called with each batch of playlist items.
 * @returns A promise that resolves to an array of all playlist items.
 */
async function getAllPlaylistItems(
  callback: ((items: youtube_v3.Schema$PlaylistItem[]) => void) | null = null
): Promise<youtube_v3.Schema$PlaylistItem[]> {
  const allPlaylistItems: youtube_v3.Schema$PlaylistItem[] = [];
  try {
    const playlists = await getPlaylists();

    for (const { id } of playlists) {
      if (!id) continue;
      try {
        const playlistItems = await getPlaylistItemsById(id);
        if (callback) {
          callback(playlistItems);
        }
        allPlaylistItems.push(...playlistItems);
      } catch (err) {
        console.error(
          `Failed to fetch items for playlist ID ${id}:`,
          err instanceof Error ? err.message : String(err)
        );
      }
    }
  } catch (error) {
    console.error('Failed to fetch collections:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
  return allPlaylistItems;
}

export {
  getPlaylists,
  getPlaylistItemsById,
  getAllPlaylistItems,
};