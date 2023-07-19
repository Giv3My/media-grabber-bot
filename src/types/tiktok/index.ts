export interface TikTokVideoItem {
  video: {
    download_addr: {
      url_list: string[];
    };
    play_addr: {
      url_list: string[];
    };
  };
}

export interface TikTokVideoData {
  aweme_list: TikTokVideoItem[];
}
