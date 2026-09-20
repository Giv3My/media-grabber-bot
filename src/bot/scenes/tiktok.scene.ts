import { Markup, Scenes } from 'telegraf';
import { Scene } from './base';
import { HelpCommand, HomeCommand, InstagramCommand, YoutubeCommand } from '../commands';
import { validateUrl, getTikTokData, normalizeUrl, chunkArray } from '../../helpers';
import { BotContext } from '../types';
import { Convenience } from 'telegraf/types';

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
        const data = await getTikTokData(url);

        if (!data) {
          return await ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }

        const options = {
          caption: `[TikTok link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
          parse_mode: 'MarkdownV2',
        } as const;

        const handlePhotos = async () => {
          const mediaChunks = chunkArray(data.images, 10);

          for (const chunk of mediaChunks) {
            await ctx.replyWithMediaGroup(
              chunk.map((image) => ({
                ...options,
                type: 'photo',
                media: image,
              })) as Convenience.MediaGroup,
              {}
            );
          }
        };

        const handleVideo = async () => {
          await ctx.replyWithVideo(
            {
              url: data.video.url,
            },
            {
              ...options,
              width: 240,
              height: 430,
              supports_streaming: true,
              thumbnail: {
                url: data.thumb,
              },
            }
          );
        };

        try {
          data.images.length > 0 ? await handlePhotos() : await handleVideo();

          ctx.replyWithAudio(
            {
              url: data.audio.url,
            },
            {
              thumbnail: {
                url: data.thumb,
              },
              reply_parameters: { message_id: ctx.message.message_id },
            }
          );
        } catch {
          return ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }
      } else {
        return ctx.reply('Enter a valid tiktok url');
      }
    });
  }
}
