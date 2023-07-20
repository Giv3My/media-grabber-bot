import { getTikTokVideoId } from './index';
import { TikTokVideoData } from '../../types/tiktok';

export const getVideoData = async (url: string) => {
  const id = await getTikTokVideoId(url);

  if (!id) {
    return;
  }

  const API_URL = `${process.env.TIKTOK_API_URL}/?aweme_id=${id}`;

  try {
    const response = await fetch(API_URL);
    const data: TikTokVideoData = await response.json();
    const video = data.aweme_list[0].video;
    const audio = data.aweme_list[0].music;

    return {
      id,
      video: {
        url: video.play_addr.url_list[0],
      },
      audio: {
        title: `${audio.author} - ${audio.title}`,
        duration: audio.duration,
        url: audio.play_url.uri,
        thumb: audio.cover_thumb.url_list[0],
      },
    };
  } catch (e) {
    console.log(e);
  }
};
