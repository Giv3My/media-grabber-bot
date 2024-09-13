import axios from 'axios';
import { config } from 'dotenv';
import { InstagramMediaItem, Response } from '../../types/instagram';

config();

export const getMediaData = async (url: string) => {
  try {
    const { data: response } = await axios.get<Response>(
      `${process.env.INSTAGRAM_API_URL}?url=${url}`,
      {
        headers: {
          'x-rapidapi-key': process.env.INSTAGRAM_X_RAPIDAPI_KEY as string,
          'x-rapidapi-host': process.env.INSTAGRAM_X_RAPIDAPI_HOST as string,
        },
      }
    );

    let data: InstagramMediaItem[] = [];

    if (response.error) {
      throw Error;
    }

    if (response.type === 'album') {
      data = response.medias.map<InstagramMediaItem>((media) => ({
        url: media.download_url,
        type: media.type === 'image' ? 'photo' : 'video',
      }));
    } else {
      data.push({
        url: response.download_url,
        type: response.type === 'image' ? 'photo' : 'video',
      });
    }

    return {
      data,
      status: true,
    };
  } catch {
    return {
      status: false,
    };
  }
};
