import { Telegraf } from 'telegraf';
import { BotContext } from '../types';

export class TikTokCommand {
  constructor(bot: Telegraf<BotContext>) {
    bot.command('tiktok', (ctx) => {
      ctx.scene.enter('tiktok');
    });
  }
}
