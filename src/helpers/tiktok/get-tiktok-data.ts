import axios from 'axios';
import { config } from 'dotenv';
import type { Response } from '../../types/tiktok';

config();

export const getTikTokData = async (url: string) => {
  try {
    const { data } = await axios.get<Response>(process.env.TIKTOK_API_URL! + url);

    if (!data.ok) {
      return null;
    }

    return {
      video: {
        url: data.hdVideoUrl || data.videoUrl,
      },
      audio: {
        url: data.audioUrl,
      },
      thumb: data.thumbnail,
      images: data.images,
    };
  } catch {
    return null;
  }
};
