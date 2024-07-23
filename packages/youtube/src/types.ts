import { youtube_v3 } from 'googleapis';

export type Playlist = youtube_v3.Schema$Playlist;
export type PlaylistItem = youtube_v3.Schema$PlaylistItem;

export interface PaginatedResponse<T> {
  items: T[];
  nextPageToken?: string;
}