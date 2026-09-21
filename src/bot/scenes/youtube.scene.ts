import { Markup, Scenes } from 'telegraf';
import { Scene } from './base';
import { HelpCommand, HomeCommand, InstagramCommand, TikTokCommand } from '../commands';
import {
  extractYtVideoId,
  getFormatFileSize,
  getYtClient,
  getYtVideoFormat,
  getYtVideoInfo,
} from '../../helpers/youtube';
import { BotContext } from '../types';

export class YoutubeScene extends Scene {
  protected keyboard = Markup.keyboard([Markup.button.callback('🔙 Go Back', 'go_back')])
    .oneTime()
    .resize();

  constructor() {
    super();

    this.scene = new Scenes.BaseScene<BotContext>('youtube');
    this.commands = [
      new HelpCommand(this.scene),
      new HomeCommand(this.scene),
      new TikTokCommand(this.scene),
      new InstagramCommand(this.scene),
    ];

    this.handle();
  }

  protected handle() {
    this.scene.enter((ctx) => {
      ctx.reply('Input url of the youtube video', this.keyboard);
    });

    this.scene.hears('🔙 Go Back', (ctx) => {
      ctx.scene.enter('home');
    });

    this.scene.on('message', async (ctx) => {
      if ('text' in ctx.message) {
        const url = ctx.message.text;

        const videoId = extractYtVideoId(url);

        if (!videoId) {
          return ctx.reply('Enter a valid youtube url');
        }

        try {
          const yt = await getYtClient();
          const videoInfo = await getYtVideoInfo(videoId);
          const format = getYtVideoFormat(videoInfo);

          if (!format) {
            throw new Error('No suitable video format found');
          }

          const directUrl = await format.decipher(yt.session.player);

          if (!directUrl) {
            throw new Error("Can't get video stream url");
          }

          const MAX_BYTES = 20 * 1024 * 1024;
          const fileSize = await getFormatFileSize(format, directUrl);

          if (!fileSize) {
            throw new Error("Can't get video file size");
          }

          if (fileSize > MAX_BYTES) {
            return ctx.reply('This video is too large, try another one');
          }

          ctx.replyWithVideo(
            {
              url: directUrl,
            },
            {
              width: format.width ?? 1280,
              height: format.height ?? 720,
              supports_streaming: true,
              caption: `[Youtube link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
              parse_mode: 'MarkdownV2',
            }
          );
        } catch {
          return ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }
      } else {
        return ctx.reply('Enter a valid youtube url');
      }
    });
  }
}
