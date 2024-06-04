import axios from 'axios';
import cheerio from 'cheerio';
import { config } from 'dotenv';

config();

export const getVideoData = async (url: string) => {
  const json = await (
    await axios.post(
      process.env.TIKTOK_API_URL!,
      {
        q: url,
        lang: 'ru',
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }
    )
  ).data;

  try {
    const $ = cheerio.load(json.data);

    const linkButtons = $('a[onclick="showAd()"]');
    const thumbnailUrl = $('.thumbnail').find('img').attr('src')!;

    let videoUrl = '',
      audioUrl = '';

    linkButtons.each((_, linkButton) => {
      const linkUrl = $(linkButton).attr('href')!;
      const buttonText = $(linkButton).text().trim();

      if (buttonText.includes('Download MP4 [2]')) {
        videoUrl = linkUrl;
      } else if (buttonText.includes('Download MP3')) {
        audioUrl = linkUrl;
      }
    });

    return {
      video: {
        url: videoUrl,
      },
      audio: {
        url: audioUrl,
      },
      thumb: thumbnailUrl,
    };
  } catch (e) {
    return null;
  }
};
