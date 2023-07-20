export type InstagramMediaType = 'video' | 'image';

export interface InstagramMediaItem {
  type: InstagramMediaType;
  url: string;
}

export interface InstagramMediaData {
  status: boolean;
  data: InstagramMediaItem[];
}
