import { IRaindrop } from '@apiso/raindrop';
import { IPlaylistItem } from '@apiso/youtube';
import { RAINDROP_CONSTANTS } from '@apiso/core';

export function constructRaindropFromYoutubePlaylistItem(
  playlistTitle: string,
  playlistItem: IPlaylistItem
): IRaindrop {
  const { snippet } = playlistItem;
  return {
    tags: ['resources', playlistTitle],
    collection: {
      $ref: 'collections',
      $id: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
      oid: RAINDROP_CONSTANTS.RAINDROP_RESOURCES_ID,
    },
    type: 'video',
    title: snippet!.title!,
    link: `https://www.youtube.com/watch?v=${snippet!.resourceId!.videoId}`,
    excerpt: snippet!.description!,
  };
}
