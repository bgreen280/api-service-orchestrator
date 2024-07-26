import { IPlaylistItem } from '@apiso/youtube';
import { IRaindrop } from '@apiso/raindrop';
import { RAINDROP_CONSTANTS } from '@apiso/core';

export function constructRaindropFromYoutubePlaylistItem(
  playlistTitle: string,
  {
    snippet: {
      description,
      title: videoTitle,
      resourceId: { videoId },
    },
  }: IPlaylistItem
): IRaindrop {
  return {
    tags: ['resources', playlistTitle],
    collection: {
      $ref: 'collections',
      $id: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
      oid: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
    },
    type: 'video',
    title: videoTitle,
    link: `https://www.youtube.com/watch?v=${videoId}`,
    excerpt: description,
  };
}
