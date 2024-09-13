export type InstagramMediaType = 'video' | 'photo';

export interface InstagramMediaItem {
  type: InstagramMediaType;
  url: string;
}
interface SingleObjectResponse {
  type: 'video' | 'image';
  download_url: string;
}

interface AlbumObjectResponse {
  type: 'album';
  medias: SingleObjectResponse[];
}

export type ResponseSuccess = {
  error: false;
} & (SingleObjectResponse | AlbumObjectResponse);

export interface ResponseFail {
  error: true;
}

export type Response = ResponseSuccess | ResponseFail;
