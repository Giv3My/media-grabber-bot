import ig from 'instagram-url-dl';

export const getMediaData = async (url) => {
  try {
    const data = await ig(url);

    return data;
  } catch (e) {
    console.log(e);
  }
};
