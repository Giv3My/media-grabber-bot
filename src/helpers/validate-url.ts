import { isTikTokUrl } from '../bot/guards';
import { SocialNetworkType } from '../types';

export const validateUrl = (url: string, socialNetwork: SocialNetworkType) => {
  if (isTikTokUrl(socialNetwork)) {
    return url.includes('.tiktok.');
  }
};
