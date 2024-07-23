import { Raindrop } from './types';
import { CONSTANTS } from './utils';
import { PlaylistItem } from '@apiso/youtube'
export function constructRaindropFromYoutubePlaylistItem(
  playlistTitle: string,
  {
    snippet: {
      description,
      title: videoTitle,
      resourceId: { videoId },
    },
  }: PlaylistItem
): Raindrop {
  return {
    tags: ["resources", playlistTitle],
    collection: {
      $ref: "collections",
      $id: CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
      oid: CONSTANTS.RAINDROP.RAINDROP_RESOURCES_ID,
    },
    type: "video",
    title: videoTitle,
    link: `https://www.youtube.com/watch?v=${videoId}`,
    excerpt: description,
  };
}