import { Markup, Scenes } from 'telegraf';
import axios from 'axios';
import { Scene } from './base';
import { HelpCommand, HomeCommand, TikTokCommand, YoutubeCommand } from '../commands';
import { validateUrl, getInstagramData, chunkArray } from '../../helpers';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import { BotContext } from '../types';
import type { InstagramMediaItem } from '../../types/instagram';

export class InstagramScene extends Scene {
  protected keyboard = Markup.keyboard([Markup.button.callback('🔙 Go Back', 'go_back')])
    .oneTime()
    .resize();

  constructor() {
    super();

    this.scene = new Scenes.BaseScene<BotContext>('instagram');
    this.commands = [
      new HelpCommand(this.scene),
      new HomeCommand(this.scene),
      new TikTokCommand(this.scene),
      new YoutubeCommand(this.scene),
    ];

    this.handle();
  }

  protected handle() {
    this.scene.enter((ctx) => {
      ctx.reply(
        'Input url of the public instagram media(video, post or story)',
        this.keyboard
      );
    });

    this.scene.hears('🔙 Go Back', (ctx) => {
      ctx.scene.enter('home');
    });

    this.scene.on('message', async (ctx) => {
      if ('text' in ctx.message) {
        const url = ctx.message.text;

        const isValid = validateUrl(url, 'instagram');

        if (!isValid) {
          return ctx.reply('Enter a valid instagram link(video, post or story)');
        }

        try {
          const { data, status } = await getInstagramData(ctx.message.text);

          if (!data || !status) {
            throw Error;
          }

          const getMediaGroup = async (items: InstagramMediaItem[]) => {
            return Promise.all(
              items.map(async (item) => {
                const response = await axios.get(item.url, {
                  responseType: 'arraybuffer',
                });

                const buffer = Buffer.from(response.data);

                return {
                  type: item.type,
                  media: { source: buffer },
                  caption: `[Instagram link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
                  parse_mode: 'MarkdownV2',
                };
              })
            );
          };

          const mediaGroup = await getMediaGroup(data);
          const mediaChunks = chunkArray(mediaGroup, 10);

          for (const chunk of mediaChunks) {
            await ctx.replyWithMediaGroup(chunk as unknown as MediaGroup, {});
          }
        } catch {
          return ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }
      } else {
        return ctx.reply('Enter a valid instagram link (video, post or story)');
      }
    });
  }
}
