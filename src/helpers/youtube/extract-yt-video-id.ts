export const extractYtVideoId = (url: string): string | null => {
  if (!url) return null;

  if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
    return url;
  }

  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/|\/shorts\/)/);

  if (arr[2] !== undefined) {
    const id = arr[2].split(/[^\w-]/i)[0];
    return id.length === 11 ? id : null;
  }

  return null;
};
