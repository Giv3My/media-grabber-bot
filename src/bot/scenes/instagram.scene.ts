import { Markup, Scenes } from 'telegraf';
import { Scene } from './base';
import { HelpCommand, HomeCommand, TikTokCommand, YoutubeCommand } from '../commands';
import { validateUrl, getMediaData } from '../../helpers';
import { InstagramMediaData } from '../../types/instagram';
import { MediaGroup } from 'telegraf/typings/telegram-types';
import { BotContext } from '../types';

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
      ctx.reply('Input url of the instagram media(video or post)', this.keyboard);
    });

    this.scene.hears('🔙 Go Back', (ctx) => {
      ctx.scene.enter('home');
    });

    this.scene.on('message', async (ctx) => {
      if ('text' in ctx.message) {
        const url = ctx.message.text;

        const isValid = validateUrl(url, 'instagram');

        if (!isValid) {
          return ctx.reply('Enter a valid instagram link(reel or post)');
        }

        const { data, status } = (await getMediaData(
          ctx.message.text
        )) as InstagramMediaData;

        if (!data || !status) {
          return await ctx.reply(
            'An error occurred while processing your request, please try again later'
          );
        }

        ctx.replyWithMediaGroup(
          data.map((item) => ({
            type: item.type === 'image' ? 'photo' : item.type,
            media: item.url,
            caption: `[Instagram link](${url})\n\nDownloaded in @${ctx.botInfo.username}`,
            parse_mode: 'MarkdownV2',
          })) as MediaGroup,
          {}
        );
      } else {
        return ctx.reply('Enter a valid instagram link (reel or post)');
      }
    });
  }
}
