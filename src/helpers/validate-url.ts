import { validateInstgramUrl } from './instagram/validate-instagram-url';
import { isTikTokUrl } from '../bot/guards';
import { SocialNetworkType } from '../types';

export const validateUrl = (url: string, socialNetwork: SocialNetworkType) => {
  if (isTikTokUrl(socialNetwork)) {
    return url.includes('.tiktok.');
  } else {
    return validateInstgramUrl(url);
  }
};
