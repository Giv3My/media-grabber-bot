import { SocialNetworkType } from '.';

export const isTikTokUrl = (
  socialNetwork: SocialNetworkType
): socialNetwork is 'tiktok' => {
  return socialNetwork === 'tiktok';
};
