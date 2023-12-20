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
    const { size, index } = videoSizes.sort((a, b) => b.size - a.size).pop()!;

    return { ...videos[index], size };
  });
};
