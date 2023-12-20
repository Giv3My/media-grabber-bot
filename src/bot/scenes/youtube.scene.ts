import { Markup, Scenes } from 'telegraf';
import * as ytdl from 'ytdl-core';
import { Scene } from './base';
import { HelpCommand, HomeCommand, InstagramCommand, TikTokCommand } from '../commands';
import { filterYoutubeVideos, getMostFitableVideo } from '../../helpers';
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

        const isValid = ytdl.validateURL(url);

        if (!isValid) {
          return ctx.reply('Enter a valid youtube url');
        }

        try {
          const data = await ytdl.getInfo(url);
          const videos = filterYoutubeVideos(data.formats);
          const video = await getMostFitableVideo(videos);

          if (video.size >= 50) {
            return await ctx.reply('This video is too large, try another one');
          }

          ctx.replyWithVideo(
            {
              url: video.url,
            },
            {
              width: video.width,
              height: video.height,
              supports_streaming: true,
              caption: `[Youtube link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
              parse_mode: 'MarkdownV2',
            }
          );
        } catch (err) {
          console.log(err);

          return await ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }
      } else {
        return ctx.reply('Enter a valid youtube url');
      }
    });
  }
}
