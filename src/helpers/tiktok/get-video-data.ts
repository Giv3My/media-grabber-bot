import { normalizeUrl, getTikTokVideoId } from './index';
import { TikTokVideoData } from '../../types/tiktok';

export const getVideoData = async (url: string) => {
  url = await normalizeUrl(url);
  const id = await getTikTokVideoId(url);

  if (!id) {
    return;
  }

  const API_URL = `${process.env.TIKTOK_API_URL}/?aweme_id=${id}`;

  try {
    const response = await fetch(API_URL);
    const data: TikTokVideoData = await response.json();
    const url = data.aweme_list[0].video.play_addr.url_list[0];

    return {
      id,
      url,
    };
  } catch (e) {
    console.log(e);
  }
};
