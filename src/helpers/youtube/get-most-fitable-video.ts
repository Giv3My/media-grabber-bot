import * as ytdl from 'ytdl-core';

export const getMostFitableVideo = (videos: ytdl.videoFormat[]) => {
  return Promise.all(
    videos.map((video, index) => {
      return fetch(video.url).then((res) => {
        const contentLength = +res.headers?.get('content-length')!;
        const size = +Math.floor(contentLength / 1024 ** 2).toFixed(2);

        return { index, size };
      });
    })
  ).then((videoSizes) => {
    const video = videoSizes
      .sort((a, b) => a.size - b.size)
      .filter((video) => video.size < 50)
      .pop();

    if (!video) {
      return null;
    }

    return {
      ...videos[video.index],
      size: video.size,
    };
  });
};
