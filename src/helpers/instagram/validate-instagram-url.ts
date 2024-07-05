export const validateInstagramUrl = (url: string) => {
  const reg = new RegExp(
    '(https://www.instagram.com/(?:p|reel(|s)|tv|stories)/[a-zA-Z0-9_-]{5})'
  );
  const match = url.match(reg);

  return Boolean(match);
};
