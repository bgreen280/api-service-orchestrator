import { youtube_v3 } from '@apiso/core';

export type IPlaylist = youtube_v3.Schema$Playlist;
export type IPlaylistItem = youtube_v3.Schema$PlaylistItem;

export interface IPaginatedResponse<T> {
  items: T[];
  nextPageToken?: string;
}
