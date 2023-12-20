import * as ytdl from 'ytdl-core';

export const filterYoutubeVideos = (videos: ytdl.videoFormat[]) => {
  return videos
    .sort((a, b) => b.fps! - a.fps! || b?.width! - a?.width!)
    .filter((video) => video.hasVideo && video.hasAudio);
};
