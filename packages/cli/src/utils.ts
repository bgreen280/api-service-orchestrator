import { YouTubeClient, IPlaylistItem } from '@apiso/youtube';
import { RaindropClient, IRaindrop } from '@apiso/raindrop';
import { RAINDROP_CONSTANTS, google } from '@apiso/core';



export function createRaindropClient(): RaindropClient {
  const apiKey = process.env.RAINDROP_API_KEY;
  if (!apiKey) {
    throw new Error('RAINDROP_API_KEY is not set in the environment variables');
  }
  return new RaindropClient(apiKey);
}

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
