import axios from 'axios';
import cheerio from 'cheerio';
import { config } from 'dotenv';
import { InstagramMediaItem } from '../../types/instagram';

config();

export const getMediaData = async (url: string) => {
  const json = await (
    await axios.post(
      process.env.INSTAGRAM_API_URL!,
      {
        q: url,
        t: 'media',
        lang: 'en',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Sec-Ch-Ua-Platform': 'Windows',
        },
      }
    )
  ).data;

  try {
    const data: InstagramMediaItem[] = [];

    const $ = cheerio.load(json.data);
    const items = $('.download-box > li');

    items.each((_, item) => {
      const linkButton = $(item).find('a');
      const url = linkButton.attr('href')!;
      const type = linkButton.attr('title')?.includes('Video') ? 'video' : 'photo'!;

      data.push({
        url,
        type,
      });
    });

    return {
      data,
      status: true,
    };
  } catch (e) {
    return {
      status: false,
    };
  }
};
