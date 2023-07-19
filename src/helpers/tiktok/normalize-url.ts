export const normalizeUrl = async (url: string) => {
  if (url.includes('/vm.') || url.includes('/vt.')) {
    const response = await fetch(url, {
      redirect: 'follow',
    });

    url = response.url;
  }

  return url;
};
