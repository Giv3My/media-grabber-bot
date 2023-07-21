import { SocialNetworkType } from '.';

export const isTikTokUrl = (
  sociealNetwork: SocialNetworkType
): sociealNetwork is 'tiktok' => {
  return sociealNetwork === 'tiktok';
};
