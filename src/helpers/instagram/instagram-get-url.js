import axios from 'axios';
import cheerio from 'cheerio';
import { config } from 'dotenv';

config();

export const instagramGetUrl = (url) => {
  return new Promise(async (resolve) => {
    try {
      let json = await (
        await axios.post(
          process.env.INSTAGRAM_API_URL,
          require('querystring').stringify({ q: url, t: 'media', lang: 'en' }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Accept-Encoding': 'gzip, deflate, br',
              'Referrer-Policy': 'strict-origin-when-cross-origin',
              'User-Agent': 'PostmanRuntime/7.31.1',
            },
          }
        )
      ).data;
      let $ = cheerio.load(json.data);
      let data = [];
      $('div[class="download-items__btn"]').each((i, e) =>
        data.push({
          type: $(e).find('a').attr('href').match('.jpg') ? 'image' : 'video',
          url: $(e).find('a').attr('href'),
        })
      );
      if (!data.length)
        return resolve({
          status: false,
        });
      resolve({
        status: true,
        data,
      });
    } catch (e) {
      console.log(e);
      return resolve({
        status: false,
        msg: e.message,
      });
    }
  });
};
