import { instagramGetUrl } from './instagram-get-url';

export const getMediaData = async (url) => {
  try {
    const data = await instagramGetUrl(url);

    return data;
  } catch (e) {
    console.log(e);
  }
};
