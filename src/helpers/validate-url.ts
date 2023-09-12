import { validateInstagramUrl } from './instagram';
import { isTikTokUrl } from '../types/guards';
import { SocialNetworkType } from '../types';

export const validateUrl = (url: string, socialNetwork: SocialNetworkType) => {
  if (isTikTokUrl(socialNetwork)) {
    return url.includes('.tiktok.');
  } else {
    return validateInstagramUrl(url);
  }
};
