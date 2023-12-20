import { Markup, Scenes } from 'telegraf';
import { Scene } from './base';
import { HelpCommand, HomeCommand, InstagramCommand, YoutubeCommand } from '../commands';
import { validateUrl, getVideoData, normalizeUrl } from '../../helpers';
import { BotContext } from '../types';

export class TikTokScene extends Scene {
  protected keyboard = Markup.keyboard([Markup.button.callback('🔙 Go Back', 'go_back')])
    .oneTime()
    .resize();

  constructor() {
    super();

    this.scene = new Scenes.BaseScene<BotContext>('tiktok');
    this.commands = [
      new HelpCommand(this.scene),
      new HomeCommand(this.scene),
      new InstagramCommand(this.scene),
      new YoutubeCommand(this.scene),
    ];

    this.handle();
  }

  protected handle() {
    this.scene.enter((ctx) => {
      ctx.reply('Input url of the tiktok video', this.keyboard);
    });

    this.scene.hears('🔙 Go Back', (ctx) => {
      ctx.scene.enter('home');
    });

    this.scene.on('message', async (ctx) => {
      if ('text' in ctx.message) {
        let url = ctx.message.text;
        const isValid = validateUrl(url, 'tiktok');

        if (!isValid) {
          return ctx.reply('Enter a valid tiktok url');
        }

        url = await normalizeUrl(url);
        const data = await getVideoData(url);

        if (!data) {
          return await ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }

        await ctx.replyWithVideo(
          {
            url: data.video.url,
          },
          {
            width: 240,
            height: 430,
            supports_streaming: true,
            caption: `[TikTok link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
            parse_mode: 'MarkdownV2',
          }
        );

        ctx.replyWithAudio(
          {
            url: data.audio.url,
          },
          {
            title: data.audio.title,
            duration: data.audio.duration,
            thumb: {
              url: data.audio.thumb,
            },
            reply_to_message_id: ctx.message.message_id,
          }
        );
      } else {
        return ctx.reply('Enter a valid tiktok url');
      }
    });
  }
}
