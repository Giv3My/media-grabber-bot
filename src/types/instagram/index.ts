export type InstagramMediaType = 'video' | 'photo';

export interface InstagramMediaItem {
  type: InstagramMediaType;
  url: string;
}
