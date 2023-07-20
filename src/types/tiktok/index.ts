export interface TikTokVideoItem {
  video: {
    download_addr: {
      url_list: string[];
    };
    play_addr: {
      url_list: string[];
    };
  };
  music: {
    author: string;
    title: string;
    cover_thumb: {
      url_list: string[];
    };
    play_url: {
      uri: string;
      url_list: string[];
    };
    duration: number;
  };
}

export interface TikTokVideoData {
  aweme_list: TikTokVideoItem[];
}
