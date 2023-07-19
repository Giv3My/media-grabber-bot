import { SocialNetworkType } from '../types';

export const isTikTokUrl = (
  sociealNetwork: SocialNetworkType
): sociealNetwork is 'tiktok' => {
  return sociealNetwork === 'tiktok';
};
