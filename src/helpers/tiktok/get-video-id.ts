export const getIdFromUrl = (url: string) => {
  const urlItems = url.split('/');
  const idIndex = urlItems.findIndex((item) => item === 'video') + 1;
  const id = urlItems[idIndex];

  return id.slice(0, 19);
};

export const getTikTokVideoId = async (url: string) => {
  if (!url.includes('/video/')) {
    return;
  }

  return getIdFromUrl(url);
};
