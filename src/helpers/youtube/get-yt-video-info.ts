import axios from 'axios';
import { Innertube, UniversalCache, YT } from 'youtubei.js';

let ytClientPromise: Promise<Innertube> | null = null;

export const getYtClient = () => {
  if (!ytClientPromise) {
    ytClientPromise = Innertube.create({ cache: new UniversalCache(true) });
  }

  return ytClientPromise;
};

export const getYtVideoInfo = async (videoId: string) => {
  const yt = await getYtClient();

  return yt.getBasicInfo(videoId, {
    client: 'ANDROID',
  });
};

export const getYtVideoFormat = (videoInfo: YT.VideoInfo) => {
  let format: ReturnType<typeof videoInfo.chooseFormat> | undefined;

  try {
    format = videoInfo.chooseFormat({
      type: 'video+audio',
      format: 'mp4',
    });
  } catch {
    format = undefined;
  }

  if (!format) {
    format =
      videoInfo.streaming_data?.formats.find((f) => f.has_video && f.has_audio) ||
      videoInfo.streaming_data?.formats[0];
  }

  return format ?? null;
};

export const getFileSize = async (url: string) => {
  try {
    const res = await axios.head(url);
    const length = res.headers['content-length'];
    return length ? parseInt(length.toString(), 10) : null;
  } catch {
    return null;
  }
};

export const getFormatFileSize = (
  format: NonNullable<ReturnType<typeof getYtVideoFormat>>,
  directUrl: string
) => {
  if (format.content_length) {
    return Promise.resolve(format.content_length);
  }

  return getFileSize(directUrl);
};
